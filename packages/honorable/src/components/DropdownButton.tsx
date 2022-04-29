import { KeyboardEvent, MouseEvent, Ref, forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import { MenuStateType } from '../contexts/MenuContext'
import usePrevious from '../hooks/usePrevious'
import usePartProps from '../hooks/usePartProps'
import useEscapeKey from '../hooks/useEscapeKey'
import useForkedRef from '../hooks/useForkedRef'
import useOutsideClick from '../hooks/useOutsideClick'
import useRegisterProps from '../hooks/useRegisterProps'
import enhanceEventTarget from '../utils/enhanceEventTarget'

import { Button } from './Button'
import { Caret } from './Caret'
import { Menu } from './Menu'
import { Div, DivProps } from './tags'

// TODO v1 ButtonProps
export type DropdownButtonProps = DivProps & {
  open?: boolean
  defaultOpen?: boolean
  label?: string
  fade?: boolean
  onChange?: (event: MouseEvent | KeyboardEvent) => void
}

export const dropdownButtonPropTypes = {
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  label: PropTypes.string,
  fade: PropTypes.bool,
  onChange: PropTypes.func,
}

function DropdownButtonRef(props: DropdownButtonProps, ref: Ref<any>) {
  const {
    honorableId,
    open,
    defaultOpen,
    label,
    fade,
    onChange,
    children,
    ...otherProps
  } = props
  const dropdownButtonRef = useRef<any>()
  const forkedRef = useForkedRef(ref, dropdownButtonRef)
  const [actualOpen, setActualOpen] = useState(open ?? defaultOpen ?? false)
  const [menuState, setMenuState] = useState<MenuStateType>({})
  const { value, event } = menuState
  const previousEvent = usePrevious(event)

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
  }, [previousEvent, event, value, onChange])

  useEffect(() => {
    // Prevents initial handleClose
    if (!previousEvent) return

    if (open || defaultOpen) handleOpen()
    else handleClose()
  }, [open, defaultOpen, previousEvent])

  function handleOpen() {
    setActualOpen(true)
    setMenuState(x => ({ ...x, shouldFocus: true, isSubMenuVisible: true, activeItemIndex: -1 }))
  }

  function handleClose() {
    setActualOpen(false)
    setMenuState(x => ({ ...x, activeItemIndex: -1 }))
  }

  return (
    <Div
      ref={forkedRef}
      position="relative"
      display="inline-block"
      {...otherProps}
    >
      <Button
        endIcon={(
          <Div
            flex="x5"
            extend={extendEndIcon}
          >
            <Caret rotation={actualOpen ? 180 : 0} />
          </Div>
        )}
        onClick={() => {
          if (actualOpen) handleClose()
          else handleOpen()
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
