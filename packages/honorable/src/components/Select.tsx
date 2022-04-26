import { Children, KeyboardEvent, MouseEvent, ReactElement, Ref, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import { MenuStateType } from '../contexts/MenuContext'
import useTheme from '../hooks/useTheme'
import usePrevious from '../hooks/usePrevious'
import usePreviousWithDefault from '../hooks/usePreviousWithDefault'
import useForkedRef from '../hooks/useForkedRef'
import useEscapeKey from '../hooks/useEscapeKey'
import useOutsideClick from '../hooks/useOutsideClick'
import useRegisterProps from '../hooks/useRegisterProps'
import resolvePartProps from '../utils/resolvePartProps'
import enhanceEventTarget from '../utils/enhanceEventTarget'

import withHonorable from '../withHonorable'

import { Div, Span } from './tags'
import Menu from './Menu'
import Caret from './Caret'

type SelectProps = ElementProps<'div'> & {
  open?: boolean
  defaultOpen?: boolean
  value?: any
  onChange?: (event: MouseEvent | KeyboardEvent) => void
  onOpen?: (open: boolean) => void
  fade?: boolean
}

const propTypes = {
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  fade: PropTypes.bool,
}

function Select(props: SelectProps, ref: Ref<any>) {
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
  const [actualOpen, setActualOpen] = useState(open || defaultOpen || false)
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
  useRegisterProps('Select', { open: actualOpen })
  useEscapeKey(() => handleOpen(false))
  useOutsideClick(selectRef, () => handleOpen(false))

  useEffect(() => {
    if (typeof open === 'undefined' || previousOpen === open) return
    handleOpen(open)
  }, [open, previousOpen, handleOpen])

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
        extend={resolvePartProps('Select', 'Caret', props, theme)}
      >
        <Caret rotation={actualOpen ? 180 : 0} />
      </Span>
    )
  }

  return (
    <Div
      ref={forkedRef}
      minWidth={128 + 32 + 8 + 2}
      display="inline-block"
      borderRadius={4}
      position="relative"
      {...otherProps}
    >
      <Div
        xflex="x4"
        cursor="pointer"
        onClick={event => {
          handleOpen(!actualOpen)
          setMenuState(x => ({ ...x, shouldFocus: true }))
          if (typeof onClick === 'function') onClick(event)
        }}
        extend={resolvePartProps('Select', 'Inner', props, theme)}
      >
        <Div
          py={0.5}
          pl={0.5}
          extend={resolvePartProps('Select', 'Selected', props, theme)}
        >
          {renderSelected()}
        </Div>
        <Span flexGrow={1} />
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
        extend={resolvePartProps('Select', 'Menu', props, theme)}
      >
        {children}
      </Menu>
    </Div>
  )
}

const ForwardedSelect = forwardRef(Select)

ForwardedSelect.propTypes = propTypes

export default withHonorable<SelectProps>(ForwardedSelect, 'Select')
