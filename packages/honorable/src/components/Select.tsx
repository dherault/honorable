import { Children, KeyboardEvent, MouseEvent, ReactElement, Ref, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { MenuStateType } from '../contexts/MenuContext'
import usePrevious from '../hooks/usePrevious'
import usePreviousWithDefault from '../hooks/usePreviousWithDefault'
import usePartProps from '../hooks/usePartProps'
import useForkedRef from '../hooks/useForkedRef'
import useEscapeKey from '../hooks/useEscapeKey'
import useOutsideClick from '../hooks/useOutsideClick'
import useRegisterProps from '../hooks/useRegisterProps'
import enhanceEventTarget from '../utils/enhanceEventTarget'

import withHonorable from '../withHonorable'

import { Div, DivProps, Span } from './tags'
import { Menu } from './Menu'
import { Caret } from './Caret'

export type SelectProps = DivProps & {
  open?: boolean
  defaultOpen?: boolean
  value?: any
  onChange?: (event: MouseEvent | KeyboardEvent) => void
  onOpen?: (open: boolean) => void
  fade?: boolean
}

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
    honorableId,
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
  const selectRef = useRef()
  const forkedRef = useForkedRef(ref, selectRef)
  const [actualOpen, setActualOpen] = useState(open ?? defaultOpen ?? false)
  const [menuState, setMenuState] = useState<MenuStateType>({ value })
  const { value: currentValue, renderedItem, event } = menuState
  const previousEvent = usePrevious(event)
  const previousOpen = usePreviousWithDefault(open)

  const handleOpen = useCallback((nextOpen: boolean) => {
    if (actualOpen === nextOpen) return
    setActualOpen(nextOpen)
    if (typeof onOpen === 'function') onOpen(nextOpen)
  }, [actualOpen, onOpen])

  // Override the `open` props in customProps
  useRegisterProps('Select', { open: actualOpen }, honorableId)
  useEscapeKey(() => handleOpen(false))
  useOutsideClick(selectRef, () => handleOpen(false))

  const extendCaret = usePartProps('Select', 'Caret', props)
  const extendInput = usePartProps('Select', 'Input', props)
  const extendMenu = usePartProps('Select', 'Menu', props)

  useEffect(() => {
    if (typeof open === 'undefined' || previousOpen === open) return
    handleOpen(open)
  }, [open, previousOpen, handleOpen])

  useEffect(() => {
    setMenuState(x => ({ ...x, value, shouldSyncWithChild: true }))
  }, [value])

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
        xflex="x5"
        userSelect="none"
        extend={extendCaret}
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
      {...otherProps}
    >
      <Div
        xflex="x4"
        onClick={event => {
          handleOpen(!actualOpen)
          setMenuState(x => ({ ...x, shouldFocus: true }))
          if (typeof onClick === 'function') onClick(event)
        }}
        extend={extendInput}
      >
        {renderSelected()}
        <Div flexGrow={1} />
        {renderCaret()}
      </Div>
      <Menu
        fade={fade}
        menuState={menuState}
        setMenuState={setMenuState}
        position="absolute"
        top="100%"
        right={0}
        left={0}
        zIndex={100}
        display={actualOpen ? 'block' : 'none'}
        extend={extendMenu}
      >
        {children}
      </Menu>
    </Div>
  )
}

SelectRef.displayName = 'Select'

const ForwardedSelect = forwardRef(SelectRef)

ForwardedSelect.propTypes = selectPropTypes

export const Select = withHonorable<SelectProps>(ForwardedSelect, 'Select')
