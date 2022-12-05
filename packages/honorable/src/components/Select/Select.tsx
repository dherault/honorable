import { Children, KeyboardEvent, MouseEvent, ReactElement, Ref, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps, TargetWithValue } from '../../types'

import { MenuStateType } from '../../contexts/MenuContext'
import MenuUsageContext, { MenuUsageContextType, MenuUsageStateType } from '../../contexts/MenuUsageContext'

import useTheme from '../../hooks/useTheme'
import usePrevious from '../../hooks/usePrevious'
import usePreviousWithDefault from '../../hooks/usePreviousWithDefault'
import useForkedRef from '../../hooks/useForkedRef'
import useEscapeKey from '../../hooks/useEscapeKey'
import useOutsideClick from '../../hooks/useOutsideClick'
import useRootStyles from '../../hooks/useRootStyles'

import resolvePartStyles from '../../resolvers/resolvePartStyles'
import filterUndefinedValues from '../../utils/filterUndefinedValues'

import enhanceEventTarget from '../../utils/enhanceEventTarget'

import { Div, Span } from '../tags'
import { Menu } from '../Menu/Menu'
import { Caret } from '../Caret/Caret'

export const selectParts = ['Selected', 'Menu', 'Placeholder'] as const

export const selectPropTypes = {
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  fade: PropTypes.bool,
  renderSelected: PropTypes.func,
  startIcon: PropTypes.element,
  endIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  menuOnTop: PropTypes.bool,
  placeholder: PropTypes.string,
}

export type SelectBaseProps = {
  open?: boolean
  defaultOpen?: boolean
  value?: any
  onChange?: (event: TargetWithValue<MouseEvent | KeyboardEvent>) => void
  onOpen?: (open: boolean) => void
  fade?: boolean
  renderSelected?: (value: any) => ReactElement
  startIcon?: ReactElement
  endIcon?: ReactElement | boolean
  menuOnTop?: boolean
  placeholder?: string
}

export type SelectProps = ComponentProps<SelectBaseProps, 'div', typeof selectParts[number]>

function SelectRef(props: SelectProps, ref: Ref<any>) {
  const {
    open,
    defaultOpen = false,
    value,
    onChange,
    onOpen,
    onClick,
    renderSelected,
    fade = true,
    startIcon = null,
    endIcon = null,
    menuOnTop = false,
    children,
    placeholder,
    ...otherProps
  } = props
  const theme = useTheme()
  const selectRef = useRef()
  const forkedRef = useForkedRef(ref, selectRef)
  const [actualOpen, setActualOpen] = useState(open ?? defaultOpen ?? false)
  const [menuState, setMenuState] = useState<MenuStateType>({ })
  const [menuUsageState, setMenuUsageState] = useState<MenuUsageStateType>({ value })
  const menuUsageValue = useMemo<MenuUsageContextType>(() => [menuUsageState, setMenuUsageState], [menuUsageState, setMenuUsageState])
  const { value: currentValue, renderedItem, event } = menuUsageState
  const previousEvent = usePrevious(event)
  const previousOpen = usePreviousWithDefault(open)
  const workingProps = { ...props, open: actualOpen }
  const rootStyles = useRootStyles('Select', workingProps, theme)

  const handleOpen = useCallback((nextOpen: boolean) => {
    setActualOpen(nextOpen)
    if (typeof onOpen === 'function') onOpen(nextOpen)
  }, [onOpen])

  const handleCloseIfOpen = useCallback(() => {
    if (actualOpen) handleOpen(false)
  }, [handleOpen, actualOpen])

  useEscapeKey(handleCloseIfOpen)
  useOutsideClick(selectRef, handleCloseIfOpen)

  const renderSelectedItem = useCallback(() => {
    if (!renderedItem) {
      return (
        <Div {...resolvePartStyles('Select.Placeholder', props, theme)}>
          {placeholder || '\u00a0'}
        </Div>
      )
    }

    if (typeof renderSelected === 'function') {
      return renderSelected(currentValue)
    }

    const nodes: ReactElement[] = []

    Children.forEach(renderedItem, (child: ReactElement) => {
      if (child?.type === Menu) return

      nodes.push(child)
    })

    return nodes
  }, [renderedItem, currentValue, renderSelected, placeholder, props, theme])

  const renderStartIcon = useCallback(() => {
    if (!startIcon) return null

    return (
      <Span
        paddingLeft={4}
        paddingRight={8}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        userSelect="none"
        {...resolvePartStyles('Select.StartIcon', props, theme)}
      >
        {startIcon}
      </Span>
    )
  }, [startIcon, props, theme])

  const renderEndIcon = useCallback(() => {
    if (endIcon === false) return null

    return (
      <Span
        padding={8}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        userSelect="none"
        {...resolvePartStyles('Select.EndIcon', props, theme)}
      >
        {endIcon || (
          <Caret rotation={actualOpen ? 180 : 0} />
        )}
      </Span>
    )
  }, [endIcon, actualOpen, props, theme])

  useEffect(() => {
    if (typeof open === 'undefined' || previousOpen === open) return
    handleOpen(open)
  }, [open, previousOpen, handleOpen])

  useEffect(() => {
    if (value === menuUsageState.value) return

    setMenuUsageState(x => ({ ...x, value, renderedItem: null }))
  }, [value, menuUsageState.value])

  useEffect(() => {
    if (event && previousEvent !== event && typeof onChange === 'function') {
      onChange(enhanceEventTarget(event, { value: currentValue }))
      handleOpen(false)
      setMenuState(x => ({ ...x, activeItemIndex: -1 }))
    }
  }, [previousEvent, event, currentValue, onChange, handleOpen])

  return (
    <Div
      ref={forkedRef}
      minWidth={128 + 32 + 8 + 2}
      position="relative"
      {...rootStyles}
      {...filterUndefinedValues(otherProps)}
    >
      <Div
        display="flex"
        alignItems="center"
        height="100%"
        onClick={event => {
          handleOpen(!actualOpen)
          setMenuState(x => ({ ...x, shouldFocus: true }))
          if (typeof onClick === 'function') onClick(event)
        }}
        {...resolvePartStyles('Select.Selected', props, theme)}
      >
        {renderStartIcon()}
        <Div
          flexGrow={1}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {renderSelectedItem()}
        </Div>
        {renderEndIcon()}
      </Div>
      <MenuUsageContext.Provider value={menuUsageValue}>
        <Menu
          fade={fade}
          menuState={menuState}
          setMenuState={setMenuState}
          position="absolute"
          top={menuOnTop ? null : '100%'}
          bottom={menuOnTop ? '100%' : null}
          right={-1} // -1 for compensating the border
          left={-1}
          zIndex={100}
          display={actualOpen ? 'block' : 'none'}
          {...resolvePartStyles('Select.Menu', props, theme)}
        >
          {children}
        </Menu>
      </MenuUsageContext.Provider>
    </Div>
  )
}

export const Select = forwardRef(SelectRef)

Select.displayName = 'Select'
Select.propTypes = selectPropTypes
