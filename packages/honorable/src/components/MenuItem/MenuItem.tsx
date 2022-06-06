import { Children, KeyboardEvent, MouseEvent, ReactElement, Ref, cloneElement, forwardRef, useContext, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import MenuContext, { MenuStateType } from '../../contexts/MenuContext'
import MenuUsageContext from '../../contexts/MenuUsageContext'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'
import useRootStyles from '../../hooks/useRootStyles'

import resolvePartStyles from '../../resolvers/resolvePartStyles2'

import { Div, DivProps, Span } from '../tags'
import { Menu } from '../Menu/Menu'
import { Caret } from '../Caret/Caret'

export type MenuItemBaseProps = {
  value?: any
  itemIndex?: number
  active?: boolean
  isSubMenuItem?: boolean
  fade?: boolean
  disabled?: boolean
}

export type MenuItemProps = DivProps & MenuItemBaseProps

export const menuItemPropTypes = {
  value: PropTypes.any,
  itemIndex: PropTypes.number,
  active: PropTypes.bool,
  isSubMenuItem: PropTypes.bool,
  fade: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

// A triangle to smooth the user interaction with the submenus
// Prevents losing focus when hovering on a submenu
function MenuItemTriangle(props: any) {
  const { isTop = false, size = 0, ...otherProps } = props
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
  const [displayed, setDisplayed] = useState(true)

  if (!displayed) return null

  return (
    <Div
      width={0}
      height={0}
      borderLeft={`${size}px solid transparent`}
      borderBottom={isTop ? `${size}px solid transparent` : 'none'}
      borderTop={!isTop ? `${size}px solid transparent` : 'none'}
      cursor="pointer"
      onMouseEnter={() => {
        setTimeoutId(setTimeout(() => {
          setDisplayed(false)
        }, 200))
      }}
      onMouseLeave={() => clearTimeout(timeoutId)}
      zIndex={100}
      {...otherProps}
    />
  )
}

function MenuItemRef(props: MenuItemProps, ref: Ref<any>) {
  const {
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
  const [height, setHeight] = useState(0)
  const rootStyles = useRootStyles('MenuItem', props, theme)

  const subMenu = useMemo(() => {
    let subMenu: ReactElement

    Children.forEach(children, (child: ReactElement) => {
      if (!subMenu && child?.type === Menu) subMenu = child
    })

    return subMenu
  }, [children])

  // Set height for the submenu's triangle
  // times 1.5 to make the triangle large enough
  useEffect(() => {
    setHeight(menuItemRef.current.offsetHeight * 1.5)
  }, [])

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

    if (!(active && menuState.active) || menuState.locked) return

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
    if (disabled || menuState.locked) return

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
      {...rootStyles}
      {...otherProps}
      onKeyDown={event => {
        handleKeyDown(event)
        if (typeof props.onKeyDown === 'function') props.onKeyDown(event)
      }}
    >
      <Div
        display="flex"
        alignItems="center"
        cursor="pointer"
        userSelect="none"
        onClick={handleSelect}
        onMouseMove={() => {
          if ((active && menuState.active && menuState.activeItemIndex === itemIndex) || menuState.locked) return

          setMenuState(x => ({
            ...x,
            active: true,
            activeItemIndex: itemIndex,
            isSubMenuVisible: true,
          }))
          setSubMenuState(x => ({ ...x, active: false, activeItemIndex: -1, isSubMenuVisible: false }))
          setParentMenuState(x => ({ ...x, active: false }))
          menuItemRef.current.focus()
        }}
        {...resolvePartStyles('MenuItem.Children', props, theme)}
      >
        {Children.map(children, (child: ReactElement) => {
          if (child?.type === Menu) return null

          return child
        })}
        {subMenu && (
          <>
            <Span flexGrow={1} />
            <Caret
              ml={0.5}
              mr={-0.5}
              rotation={-90}
              {...resolvePartStyles('MenuItem.Caret', props, theme)}
            />
          </>
        )}
      </Div>
      {active && subMenu && (
        <>
          <MenuItemTriangle
            isTop
            size={height}
            position="absolute"
            top={-height}
            right={0}
          />
          {cloneElement(subMenu, {
            fade,
            isSubMenu: true,
            menuState: subMenuState,
            setMenuState: setSubMenuState,
            position: 'absolute',
            top: 0,
            left: '100%',
            display: menuState.isSubMenuVisible ? 'block' : 'none',
            ...subMenu.props,
          })}
          <MenuItemTriangle
            size={height}
            position="absolute"
            bottom={-height}
            right={0}
          />
        </>
      )}
    </Div>
  )
}

export const MenuItem = forwardRef(MenuItemRef)

MenuItem.displayName = 'MenuItem'
MenuItem.propTypes = menuItemPropTypes
