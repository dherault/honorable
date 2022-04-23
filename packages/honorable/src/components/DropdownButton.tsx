import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import { MenuStateType } from '../contexts/MenuContext'
import useTheme from '../hooks/useTheme'
import usePrevious from '../hooks/usePrevious'
import useEscapeKey from '../hooks/useEscapeKey'
import useOutsideClick from '../hooks/useOutsideClick'
import resolvePartProps from '../utils/resolvePartProps'
import enhanceEventTarget from '../utils/enhanceEventTarget'

import Button from './Button'
import Caret from './Caret'
import Menu from './Menu'

type DropdownButtonProps = ElementProps<'button'> & {
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

function DropdownButton(props: DropdownButtonProps) {
  const { open, defaultOpen, label, fade, onChange, children, ...otherProps } = props
  const theme = useTheme()
  const dropdownRef = useRef()
  const [actualOpen, setActualOpen] = useState(open || defaultOpen)
  const [menuState, setMenuState] = useState<MenuStateType>({})
  const { value, event } = menuState
  const previousEvent = usePrevious(event)

  useEscapeKey(() => setActualOpen(false))
  useOutsideClick(dropdownRef, () => setActualOpen(false))

  useEffect(() => {
    if (previousEvent !== event && typeof onChange === 'function') {
      onChange(enhanceEventTarget(event, { value }))
      setActualOpen(false)
      setMenuState(x => ({ ...x, activeItemIndex: -1 }))
    }
  }, [previousEvent, event, value, onChange])

  useEffect(() => {
    setActualOpen(open || defaultOpen)
  }, [open, defaultOpen])

  return (
    <Button
      ref={dropdownRef}
      position="relative"
      endIcon={<Caret rotation={actualOpen ? 180 : 0} />}
      {...otherProps}
      onClick={event => {
        setActualOpen(x => !x)
        if (typeof props.onClick === 'function') props.onClick(event)
      }}
    >
      {label}
      <Menu
        fade={fade}
        position="absolute"
        top="100%"
        right={0}
        left={0}
        zIndex={100}
        display={actualOpen ? 'block' : 'none'}
        extend={resolvePartProps('dropdownButton', 'menu', props, theme)}
      >
        {children}
      </Menu>
    </Button>
  )
}

DropdownButton.propTypes = propTypes

export default withHonorable<DropdownButtonProps>(DropdownButton, 'dropdownButton')
