import { Children, KeyboardEvent, MouseEvent, ReactElement, Ref, forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps, TargetWithValue } from '../../types.js'

import { MenuStateType } from '../../contexts/MenuContext.js'
import MenuUsageContext, { MenuUsageContextType, MenuUsageStateType } from '../../contexts/MenuUsageContext.js'

import useTheme from '../../hooks/useTheme.js'
import usePrevious from '../../hooks/usePrevious.js'
import usePreviousWithDefault from '../../hooks/usePreviousWithDefault.js'
import useForkedRef from '../../hooks/useForkedRef.js'
import useEscapeKey from '../../hooks/useEscapeKey.js'
import useOutsideClick from '../../hooks/useOutsideClick.js'
import useRootStyles from '../../hooks/useRootStyles.js'

import resolvePartStyles from '../../resolvers/resolvePartStyles.js'
import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import enhanceEventTarget from '../../utils/enhanceEventTarget.js'

import { Div, Span } from '../tags.js'
import { Menu } from '../Menu/Menu.js'
import { Caret } from '../Caret/Caret.js'

export const selectParts = ['Selected', 'Menu', 'Placeholder'] as const

export const selectPropTypes = {
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
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
    startIcon = null,
    endIcon = null,
    menuOnTop = false,
    children,
    placeholder,
    ...otherProps
  } = props
  const theme = useTheme()
  const selectRef = useRef<HTMLDivElement>(null)
  const forkedRef = useForkedRef(ref, selectRef)
  const [initialRender, setInitialRender] = useState(true)
  const [actualOpen, setActualOpen] = useState(open ?? defaultOpen ?? false)
  const [menuState, setMenuState] = useState<MenuStateType>({ })
  const [menuUsageState, setMenuUsageState] = useState<MenuUsageStateType>({ value })
  const menuUsageValue = useMemo<MenuUsageContextType>(() => [menuUsageState, setMenuUsageState], [menuUsageState, setMenuUsageState])
  const { value: currentValue, renderedItem, event } = menuUsageState
  const previousEvent = usePrevious(event)
  const previousOpen = usePreviousWithDefault(open)
  const previousValue = usePreviousWithDefault(value)
  const workingProps = { ...props, open: actualOpen, defaultOpen, startIcon, endIcon, menuOnTop }
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

  // Update the menu usage state value on controlled value change
  useEffect(() => {
    if (previousValue === value) return

    setMenuUsageState(x => ({ ...x, value }))
    setInitialRender(true)
  }, [previousValue, value])

  // Allow changing children
  useEffect(() => {
    setInitialRender(true)
  }, [children])

  useEffect(() => {
    if (!(event && previousEvent !== event && typeof onChange === 'function')) return

    onChange(enhanceEventTarget(event, { value: currentValue }))
    handleOpen(false)
    setMenuState(x => ({ ...x, activeItemIndex: -1 }))
  }, [previousEvent, event, currentValue, onChange, handleOpen])

  // The initial render is used to set the initial value by the MenuItem children
  // Also used when the controlled value changes
  useEffect(() => {
    if (!initialRender) return

    setInitialRender(false)
  }, [initialRender])

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
        {(actualOpen || initialRender) && (
          <Menu
            menuState={menuState}
            setMenuState={setMenuState}
            display={initialRender ? 'none' : undefined}
            position="absolute"
            top={menuOnTop ? null : '100%'}
            bottom={menuOnTop ? '100%' : null}
            right={-1} // -1 for compensating the border
            left={-1}
            {...resolvePartStyles('Select.Menu', props, theme)}
          >
            {children}
          </Menu>
        )}
      </MenuUsageContext.Provider>
    </Div>
  )
}

const BaseSelect = forwardRef(SelectRef)

BaseSelect.displayName = 'Select'
BaseSelect.propTypes = selectPropTypes

export const Select = memo(BaseSelect)
