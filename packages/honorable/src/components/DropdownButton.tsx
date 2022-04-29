import { KeyboardEvent, MouseEvent, Ref, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import { MenuStateType } from '../contexts/MenuContext'
import usePrevious from '../hooks/usePrevious'
import usePartProps from '../hooks/usePartProps'
import useEscapeKey from '../hooks/useEscapeKey'
import useForkedRef from '../hooks/useForkedRef'
import useOutsideClick from '../hooks/useOutsideClick'
import useRegisterProps from '../hooks/useRegisterProps'
import pickProps from '../utils/pickProps'
import enhanceEventTarget from '../utils/enhanceEventTarget'

import { Button, ButtonProps, buttonPropTypes } from './Button'
import { Caret } from './Caret'
import { Menu } from './Menu'
import { Div, DivProps } from './tags'

export type DropdownButtonProps = DivProps & ButtonProps & {
  open?: boolean
  defaultOpen?: boolean
  label?: string
  fade?: boolean
  onChange?: (event: MouseEvent | KeyboardEvent) => void
  onOpen?: (open: boolean) => void
}

export const dropdownButtonPropTypes = {
  ...buttonPropTypes,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  label: PropTypes.string,
  fade: PropTypes.bool,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
}

function DropdownButtonRef(props: DropdownButtonProps, ref: Ref<any>) {
  const {
    honorableId,
    open,
    defaultOpen,
    label,
    fade,
    onChange,
    onOpen,
    children,
  } = props
  console.log('props', props)
  const [buttonProps, divProps]: [ButtonProps, DivProps] = pickProps(props, buttonPropTypes)
  const dropdownButtonRef = useRef<any>()
  const forkedRef = useForkedRef(ref, dropdownButtonRef)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const [menuState, setMenuState] = useState<MenuStateType>({})
  const { value, event } = menuState
  const previousEvent = usePrevious(event)
  const actualOpen = open ?? defaultOpen ?? uncontrolledOpen

  console.log('buttonProps', buttonProps)
  const handleOpen = useCallback(() => {
    setUncontrolledOpen(true)
    setMenuState(x => ({ ...x, shouldFocus: true, isSubMenuVisible: true, activeItemIndex: -1 }))
    if (typeof onOpen === 'function') onOpen(true)
  }, [onOpen])

  const handleClose = useCallback(() => {
    console.log('handleClose')
    setUncontrolledOpen(false)
    setMenuState(x => ({ ...x, activeItemIndex: -1 }))
    if (typeof onOpen === 'function') onOpen(false)
  }, [onOpen])

  useRegisterProps('DropdownButton', { open: actualOpen }, honorableId)
  useEscapeKey(handleClose)
  useOutsideClick(dropdownButtonRef, handleClose)

  const extendButton = usePartProps('DropdownButton', 'Button', props)
  const extendMenu = usePartProps('DropdownButton', 'Menu', props)
  const extendEndIcon = usePartProps('DropdownButton', 'EndIcon', props)

  useEffect(() => {
    if (event && previousEvent !== event) {
      if (typeof onChange === 'function') onChange(enhanceEventTarget(event, { value }))
      handleClose()
    }
  }, [previousEvent, event, value, onChange, handleClose])

  useEffect(() => {
    // Prevents initial handleClose
    if (!previousEvent) return

    if (actualOpen) handleOpen()
    else handleClose()
  }, [actualOpen, previousEvent, handleOpen, handleClose])

  return (
    <Div
      ref={forkedRef}
      position="relative"
      display="inline-block"
      {...divProps}
    >
      <Button
        {...buttonProps}
        endIcon={(
          <Div
            flex="x5"
            extend={extendEndIcon}
          >
            <Caret rotation={actualOpen ? 180 : 0} />
          </Div>
        )}
        onClick={event => {
          if (buttonProps.disabled) return

          if (actualOpen) handleClose()
          else handleOpen()

          if (typeof buttonProps.onClick === 'function')buttonProps.onClick(event)
        }}
        extend={extendButton}
      >
        {label}
      </Button>
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

DropdownButtonRef.displayName = 'DropdownButton'

const ForwardedDropdownButton = forwardRef(DropdownButtonRef)

ForwardedDropdownButton.propTypes = dropdownButtonPropTypes

export const DropdownButton = withHonorable<DropdownButtonProps>(ForwardedDropdownButton, 'DropdownButton')
