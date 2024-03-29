import { MouseEventHandler, ReactNode, Ref, forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps } from '../../types.js'

import { MenuStateType } from '../../contexts/MenuContext.js'
import MenuUsageContext, { MenuUsageContextType, MenuUsageStateType } from '../../contexts/MenuUsageContext.js'

import useTheme from '../../hooks/useTheme.js'
import usePrevious from '../../hooks/usePrevious.js'
import useEscapeKey from '../../hooks/useEscapeKey.js'
import useForkedRef from '../../hooks/useForkedRef.js'
import useOutsideClick from '../../hooks/useOutsideClick.js'
import useRootStyles from '../../hooks/useRootStyles.js'

import resolvePartStyles from '../../resolvers/resolvePartStyles.js'

import pickProps from '../../utils/pickProps.js'
import enhanceEventTarget from '../../utils/enhanceEventTarget.js'
import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import { Button, ButtonProps, buttonPropTypes } from '../Button/Button.js'
import { Caret } from '../Caret/Caret.js'
import { Menu } from '../Menu/Menu.js'
import { Div } from '../tags.js'

export const dropdownButtonParts = ['Button', 'Menu'] as const

export const dropdownButtonPropTypes = {
  ...buttonPropTypes,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  label: PropTypes.string,
  fade: PropTypes.bool,
  endIcon: PropTypes.node,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
}

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
   * The end icon for the button
   */
  endIcon?: ReactNode,
  /**
   * Callback function called when the DropdownButton returns a value
   */
  onChange?: MouseEventHandler<HTMLButtonElement>
  /**
   * Callback function called when the DropdownButton is opened or closed
   */
  onOpen?: (open: boolean) => void
}

export type DropdownButtonProps = ComponentProps<DropdownButtonBaseProps, 'div', typeof dropdownButtonParts[number]>

function DropdownButtonRef(props: DropdownButtonProps, ref: Ref<any>) {
  const [buttonProps, rootProps]: [ButtonProps, DropdownButtonProps] = pickProps(props, buttonPropTypes)
  const {
    open,
    defaultOpen,
    label,
    fade,
    endIcon,
    onChange,
    onOpen,
    children,
    ...otherProps
  } = rootProps
  const theme = useTheme()
  const dropdownButtonRef = useRef<any>()
  const forkedRef = useForkedRef(ref, dropdownButtonRef)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const [menuState, setMenuState] = useState<MenuStateType>({})
  const [menuUsageState, setMenuUsageState] = useState<MenuUsageStateType>({})
  const menuUsageValue = useMemo<MenuUsageContextType>(() => [menuUsageState, setMenuUsageState], [menuUsageState, setMenuUsageState])
  const { value, event } = menuUsageState
  const previousEvent = usePrevious(event)
  const actualOpen = open ?? uncontrolledOpen ?? false
  const workingProps = { ...props, open: actualOpen }
  const rootStyles = useRootStyles('DropdownButton', workingProps, theme)

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

  const handleOutsideClick = useCallback(() => {
    if (actualOpen) {
      handleClose()
    }
  }, [actualOpen, handleClose])

  useEscapeKey(handleClose)
  useOutsideClick(dropdownButtonRef, handleOutsideClick)

  useEffect(() => {
    if (event && previousEvent !== event) {
      if (typeof onChange === 'function') onChange(enhanceEventTarget(event, { value }))
      handleClose()
    }
  }, [previousEvent, event, value, onChange, handleClose])

  return (
    <Div
      ref={forkedRef}
      position="relative"
      display="inline-block"
      {...rootStyles}
      {...filterUndefinedValues(otherProps)}
    >
      <Button
        endIcon={endIcon || (
          <Caret rotation={actualOpen ? 180 : 0} />
        )}
        {...buttonProps}
        onClick={event => {
          if (buttonProps.disabled) return

          if (actualOpen) handleClose()
          else handleOpen()

          if (typeof buttonProps.onClick === 'function') buttonProps.onClick(event)
        }}
        {...resolvePartStyles('DropdownButton.Button', workingProps, theme)}
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
          {...resolvePartStyles('DropdownButton.Menu', workingProps, theme)}
        >
          {children}
        </Menu>
      </MenuUsageContext.Provider>
    </Div>
  )
}

const BaseDropdownButton = forwardRef(DropdownButtonRef)

BaseDropdownButton.displayName = 'DropdownButton'
BaseDropdownButton.propTypes = dropdownButtonPropTypes

export const DropdownButton = memo(BaseDropdownButton)
