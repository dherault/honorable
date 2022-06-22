import { Children, KeyboardEvent, MouseEvent, ReactElement, Ref, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { TargetWithValue } from '../../types'

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

import enhanceEventTarget from '../../utils/enhanceEventTarget'

import { Div, DivProps, Span } from '../tags'
import { Menu } from '../Menu/Menu'
import { Caret } from '../Caret/Caret'

export type SelectBaseProps = {
  open?: boolean
  defaultOpen?: boolean
  value?: any
  onChange?: (event: TargetWithValue<MouseEvent | KeyboardEvent>) => void
  onOpen?: (open: boolean) => void
  fade?: boolean
}

export type SelectProps = Omit<DivProps, 'onChange'> & SelectBaseProps

export const selectPropTypes = {
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  fade: PropTypes.bool,
}

function SelectRef(props: SelectProps, ref: Ref<any>) {
  const {
    open,
    defaultOpen,
    value,
    onChange,
    onOpen,
    fade,
    onClick,
    children,
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
    // console.log('actualOpen, nextOpen', actualOpen, nextOpen)
    if (actualOpen === nextOpen) return
    setActualOpen(nextOpen)
    if (typeof onOpen === 'function') onOpen(nextOpen)
  }, [actualOpen, onOpen])

  useEscapeKey(() => handleOpen(false))
  useOutsideClick(selectRef, () => handleOpen(false))

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

  function renderSelected() {
    if (!renderedItem) return '\u00a0'

    const nodes: ReactElement[] = []

    Children.forEach(renderedItem, (child: ReactElement) => {
      if (child?.type === Menu) return

      nodes.push(child)
    })

    return nodes
  }

  function renderCaret() {
    return (
      <Span
        p={0.5}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        userSelect="none"
        {...resolvePartStyles('Select.Caret', props, theme)}
      >
        <Caret rotation={actualOpen ? 180 : 0} />
      </Span>
    )
  }

  return (
    <Div
      ref={forkedRef}
      minWidth={128 + 32 + 8 + 2}
      position="relative"
      {...rootStyles}
      {...otherProps}
    >
      <Div
        display="flex"
        alignItems="center"
        onClick={event => {
          handleOpen(!actualOpen)
          setMenuState(x => ({ ...x, shouldFocus: true }))
          if (typeof onClick === 'function') onClick(event)
        }}
        {...resolvePartStyles('Select.Selected', props, theme)}
      >
        {renderSelected()}
        <Div flexGrow={1} />
        {renderCaret()}
      </Div>
      <MenuUsageContext.Provider value={menuUsageValue}>
        <Menu
          fade={fade}
          menuState={menuState}
          setMenuState={setMenuState}
          position="absolute"
          top="100%"
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
