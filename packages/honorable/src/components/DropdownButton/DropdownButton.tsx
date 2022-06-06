import { KeyboardEvent, MouseEvent, Ref, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { MenuStateType } from '../../contexts/MenuContext'
import MenuUsageContext, { MenuUsageContextType, MenuUsageStateType } from '../../contexts/MenuUsageContext'

import useTheme from '../../hooks/useTheme'
import usePrevious from '../../hooks/usePrevious'
import useEscapeKey from '../../hooks/useEscapeKey'
import useForkedRef from '../../hooks/useForkedRef'
import useOutsideClick from '../../hooks/useOutsideClick'
import useRootStyle from '../../hooks/useRootStyles'

import pickProps from '../../utils/pickProps'
import resolvePartStyles from '../../resolvers/resolvePartStyles2'
import enhanceEventTarget from '../../utils/enhanceEventTarget'

import { Button, ButtonProps, buttonPropTypes } from '../Button/Button'
import { Caret } from '../Caret/Caret'
import { Menu } from '../Menu/Menu'
import { Div, DivProps } from '../tags'

export type DropdownButtonBaseProps = {
  /**
   * Whether the DropdownButton is open or not
   */
  open?: boolean
  /**
   * Whether the DropdownButton is open by default or not
   */
  defaultOpen?: boolean
  /**
   * The label of the DropdownButton
   */
  label?: string
  /**
   * Whether the DropdownButton's menu should fade in and out or not
   */
  fade?: boolean
  /**
   * Callback function called when the DropdownButton returns a value
   */
  onChange?: (event: MouseEvent | KeyboardEvent) => void
  /**
   * Callback function called when the DropdownButton is opened or closed
   */
  onOpen?: (open: boolean) => void
}

export type DropdownButtonProps = Omit<DivProps & ButtonProps, 'onChange'> & DropdownButtonBaseProps

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
    open,
    defaultOpen,
    label,
    fade,
    onChange,
    onOpen,
    children,
  } = props
  const theme = useTheme()
  const [buttonProps, divProps]: [ButtonProps, DivProps] = pickProps(props, buttonPropTypes)
  const dropdownButtonRef = useRef<any>()
  const forkedRef = useForkedRef(ref, dropdownButtonRef)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const [menuState, setMenuState] = useState<MenuStateType>({})
  const [menuUsageState, setMenuUsageState] = useState<MenuUsageStateType>({})
  const menuUsageValue = useMemo<MenuUsageContextType>(() => [menuUsageState, setMenuUsageState], [menuUsageState, setMenuUsageState])
  const { value, event } = menuUsageState
  const previousEvent = usePrevious(event)
  const actualOpen = open ?? defaultOpen ?? uncontrolledOpen
  const workingProps = { ...props, open: actualOpen }
  const rootStyle = useRootStyle('DropdownButton', workingProps, theme)

  const handleOpen = useCallback(() => {
    setUncontrolledOpen(true)
    setMenuState(x => ({ ...x, shouldFocus: true, isSubMenuVisible: true, activeItemIndex: -1 }))
    if (typeof onOpen === 'function') onOpen(true)
  }, [onOpen])

  const handleClose = useCallback(() => {
    setUncontrolledOpen(false)
    setMenuState(x => ({ ...x, activeItemIndex: -1 }))
    if (typeof onOpen === 'function') onOpen(false)
  }, [onOpen])

  useEscapeKey(handleClose)
  useOutsideClick(dropdownButtonRef, handleClose)

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
      {...rootStyle}
      {...divProps}
    >
      <Button
        {...buttonProps}
        endIcon={(
          <Caret rotation={actualOpen ? 180 : 0} />
        )}
        onClick={event => {
          if (buttonProps.disabled) return

          if (actualOpen) handleClose()
          else handleOpen()

          if (typeof buttonProps.onClick === 'function') buttonProps.onClick(event)
        }}
        {...resolvePartStyles('Button', props, theme)}
      >
        {label}
      </Button>
      <MenuUsageContext.Provider value={menuUsageValue}>
        <Menu
          fade={fade}
          open={actualOpen}
          menuState={menuState}
          setMenuState={setMenuState}
          position="absolute"
          top="100%"
          right={0}
          left={0}
          zIndex={100}
          {...resolvePartStyles('Menu', props, theme)}
        >
          {children}
        </Menu>
      </MenuUsageContext.Provider>
    </Div>
  )
}

export const DropdownButton = forwardRef(DropdownButtonRef)

DropdownButton.displayName = 'DropdownButton'
DropdownButton.propTypes = dropdownButtonPropTypes
