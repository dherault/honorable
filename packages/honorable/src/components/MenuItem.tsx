import { Children, KeyboardEvent, MouseEvent, ReactElement, Ref, cloneElement, forwardRef, useContext, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import MenuContext, { MenuStateType } from '../contexts/MenuContext'
import MenuUsageContext from '../contexts/MenuUsageContext'

import useTheme from '../hooks/useTheme'
import useForkedRef from '../hooks/useForkedRef'
import useDebounce from '../hooks/useDebounce'

import resolvePartProps from '../utils/resolvePartProps'

import { Div, DivProps, Span } from './tags'
import { Menu } from './Menu'
import { Caret } from './Caret'

export type MenuItemProps = DivProps & {
  value?: any
  itemIndex?: number
  active?: boolean
  isSubMenuItem?: boolean
  fade?: boolean
  disabled?: boolean
}

export const menuItemPropTypes = {
  value: PropTypes.any,
  itemIndex: PropTypes.number,
  active: PropTypes.bool,
  isSubMenuItem: PropTypes.bool,
  fade: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

function MenuItemRef(props: MenuItemProps, ref: Ref<any>) {
  const {
    __honorableOrigin,
    __honorableOverridenProps,
    value,
    children,
    active,
    itemIndex,
    isSubMenuItem,
    fade,
    disabled,
    ...otherProps
  } = props
  const theme = useTheme()
  const menuItemRef = useRef<HTMLDivElement>()
  const forkedRef = useForkedRef(ref, menuItemRef)
  const [menuState, setMenuState,, setParentMenuState] = useContext(MenuContext)
  const [menuUsageState, setMenuUsageState] = useContext(MenuUsageContext)
  const [subMenuState, setSubMenuState] = useState<MenuStateType>({ active: false, isSubMenuVisible: false })
  const debouncedActive = useDebounce(active, 1150) // TODO

  // console.log('debouncedActive', debouncedActive, debouncedPreviousActive)
  // console.log('MenuItem menuUsageState.value', menuUsageState.value)

  const subMenu = useMemo(() => {
    let subMenu: ReactElement

    Children.forEach(children, (child: ReactElement) => {
      if (!subMenu && child?.type === Menu) subMenu = child
    })

    return subMenu
  }, [children])

  // Focus if active
  // Otherwise if subMenu is focused unfocus subMenu
  // Otherwise hide subMenu
  useEffect(() => {
    if (active && menuState.active) {
      menuItemRef.current.focus()
    }
  }, [active, menuState.active])

  // Set renderedItem if value matches menuState.value
  // Used by selects with value set on
  useEffect(() => {
    if (menuUsageState.value === value && menuUsageState.renderedItem !== children) {
      setMenuUsageState(x => ({ ...x, renderedItem: children }))
    }
  }, [menuUsageState, setMenuUsageState, value, children])

  // On right key, focus subMenu
  // On left key, unfocus menu
  // On enter key, select item
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault()

    if (!(active && menuState.active)) return

    if (subMenu && event.key === 'ArrowRight') {
      if (menuState.isSubMenuVisible) {
        setMenuState(x => ({ ...x, active: false }))
        setSubMenuState(x => ({ ...x, active: true, activeItemIndex: 0, isSubMenuVisible: true }))
      }
      else {
        setMenuState(x => ({ ...x, isSubMenuVisible: true }))
        setSubMenuState(x => ({ ...x, active: false, activeItemIndex: -1 }))
      }
    }
    else if (isSubMenuItem && event.key === 'ArrowLeft') {
      if (subMenu) {
        setSubMenuState(x => ({ ...x, active: false, isSubMenuVisible: false }))

        if (menuState.isSubMenuVisible) {
          menuItemRef.current.focus()
          setMenuState(x => ({ ...x, active: true, isSubMenuVisible: false }))
        }
        else {
          setMenuState(x => ({ ...x, active: false, activeItemIndex: -1 }))
          // TODO check the necessity of timeouts
          setTimeout(() => {
            setParentMenuState(x => ({ ...x, active: true, isSubMenuVisible: false }))
          }, 0)
        }
      }
      else {
        setMenuState(x => ({ ...x, active: false, isSubMenuVisible: false }))
        setTimeout(() => {
          setParentMenuState(x => ({ ...x, active: true, isSubMenuVisible: false }))
        }, 0)
      }
    }
    else if (event.key === 'Enter') {
      handleSelect(event)
    }
  }

  function handleSelect(event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) {
    if (disabled) return

    event.persist()

    setMenuUsageState(x => ({
      ...x,
      value,
      event,
      renderedItem: children,
    }))
    setMenuState(x => ({
      ...x,
      shouldSyncWithParent: true,
    }))
    setSubMenuState(x => ({
      ...x,
      active: false,
      isSubMenuVisible: false,
      activeItemIndex: -1,
    }))
  }

  return (
    <Div
      ref={forkedRef}
      position="relative"
      tabIndex={itemIndex}
      {...otherProps}
      onKeyDown={event => {
        handleKeyDown(event)
        if (typeof props.onKeyDown === 'function') props.onKeyDown(event)
      }}
    >
      <Div
        cursor="pointer"
        userSelect="none"
        xflex="x4"
        onClick={handleSelect}
        onMouseMove={() => {
          if (!(active && menuState.active && menuState.activeItemIndex === itemIndex)) {
            setMenuState(x => ({
              ...x,
              active: true,
              activeItemIndex: itemIndex,
              isSubMenuVisible: true,
            }))
            setSubMenuState(x => ({ ...x, active: false, activeItemIndex: -1, isSubMenuVisible: false }))
            setParentMenuState(x => ({ ...x, active: false }))
            menuItemRef.current.focus()
          }
        }}
        {...resolvePartProps(`${__honorableOrigin}.Children`, props, __honorableOverridenProps, theme)}
      >
        {Children.map(children, (child: ReactElement) => {
          if (child?.type === Menu) return null

          return child
        })}
        {subMenu && (
          <>
            <Span flexGrow={1} />
            <Caret
              __honorableOrigin={`${__honorableOrigin}.Caret`}
              ml={0.5}
              mr={-0.5}
              rotation={-90}
              {...resolvePartProps(`${__honorableOrigin}.Caret`, props, __honorableOverridenProps, theme)}
            />
          </>
        )}
      </Div>
      {(active || debouncedActive) && subMenu && (
        cloneElement(subMenu, {
          fade,
          isSubMenu: true,
          menuState: subMenuState,
          setMenuState: setSubMenuState,
          position: 'absolute',
          top: 0,
          left: '100%',
          display: menuState.isSubMenuVisible ? 'block' : 'none',
          ...subMenu.props,
        })
      )}
    </Div>
  )
}

MenuItemRef.displayName = 'MenuItemRef'

const ForwardedMenuItem = forwardRef(MenuItemRef)

ForwardedMenuItem.propTypes = menuItemPropTypes

export const MenuItem = withHonorable<MenuItemProps>(ForwardedMenuItem, 'MenuItem')
