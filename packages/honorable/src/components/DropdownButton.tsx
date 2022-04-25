import { KeyboardEvent, MouseEvent, Ref, forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import { MenuStateType } from '../contexts/MenuContext'
import useTheme from '../hooks/useTheme'
import usePrevious from '../hooks/usePrevious'
import useEscapeKey from '../hooks/useEscapeKey'
import useForkedRef from '../hooks/useForkedRef'
import useOutsideClick from '../hooks/useOutsideClick'
import resolvePartProps from '../utils/resolvePartProps'
import enhanceEventTarget from '../utils/enhanceEventTarget'

import Button from './Button'
import Caret from './Caret'
import Menu from './Menu'
import { Div } from './tags'

type DropdownButtonProps = ElementProps<'div'> & {
  open?: boolean
  defaultOpen?: boolean
  label?: string
  fade?: boolean
  onChange?: (event: MouseEvent | KeyboardEvent) => void
}

const propTypes = {
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  label: PropTypes.string,
  fade: PropTypes.bool,
  onChange: PropTypes.func,
}

function DropdownButton(props: DropdownButtonProps, ref: Ref<any>) {
  const { open, defaultOpen, label, fade, onChange, children, ...otherProps } = props
  const theme = useTheme()
  const dropdownButtonRef = useRef<any>()
  const forkedRef = useForkedRef(ref, dropdownButtonRef)
  const [actualOpen, setActualOpen] = useState(open || defaultOpen)
  const [menuState, setMenuState] = useState<MenuStateType>({ activeItemIndex: -1 })
  const { value, event } = menuState
  const previousEvent = usePrevious(event)

  useEscapeKey(handleClose)
  useOutsideClick(dropdownButtonRef, handleClose)

  useEffect(() => {
    if (previousEvent !== event) {
      if (typeof onChange === 'function') onChange(enhanceEventTarget(event, { value }))
      handleClose()
    }
  }, [previousEvent, event, value, onChange])

  useEffect(() => {
    if (open || defaultOpen) handleOpen()
    else handleClose()
  }, [open, defaultOpen])

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
        endIcon={<Caret rotation={actualOpen ? 180 : 0} />}
        onClick={() => {
          if (actualOpen) handleClose()
          else handleOpen()
        }}
        extend={resolvePartProps('DropdownButton', 'Button', props, theme)}
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
        extend={resolvePartProps('DropdownButton', 'Menu', props, theme)}
      >
        {children}
      </Menu>
    </Div>
  )
}

const ForwardedDropdownButton = forwardRef(DropdownButton)

ForwardedDropdownButton.propTypes = propTypes

export default withHonorable<DropdownButtonProps>(ForwardedDropdownButton, 'DropdownButton')
