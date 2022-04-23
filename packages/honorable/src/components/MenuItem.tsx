import { Children, KeyboardEvent, ReactElement, ReactNode, cloneElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import MenuContext, { MenuContextType, MenuStateType } from '../contexts/MenuContext'
import useTheme from '../hooks/useTheme'
// import enhanceEventTarget from '../utils/enhanceEventTarget'
import resolvePartProps from '../utils/resolvePartProps'

import { Div, Span } from './tags'
import Menu from './Menu'
import Icon from './Icon'

type MenuItemProps = ElementProps<'div'> & {
  value?: any
  itemIndex?: number
  active?: boolean
  isSubMenuItem?: boolean
  fade?: boolean
  children?: ReactNode
}

const propTypes = {
  value: PropTypes.any,
  itemIndex: PropTypes.number,
  active: PropTypes.bool,
  isSubMenuItem: PropTypes.bool,
  fade: PropTypes.bool,
  onClick: PropTypes.func,
}

// A triangle to smooth the user interaction with the submenus
// Prevents losing focus when hovering on a submenu
// TODO replace it with a delay on the menu disappearance
function MenuItemTriangle(props: any) {
  const { isTop = false, size = 0, ...otherProps } = props
  const theme = useTheme()
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
  const [displayed, setDisplayed] = useState(true)

  if (!displayed) return null

  // function handleMouseMove({ movementX, movementY }: MouseEvent) {
    // console.log('event', movementX, movementY)
  // }

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
      // onMouseMove={handleMouseMove}
      zIndex={100}
      {...otherProps}
      extend={resolvePartProps('menuItem', 'triangle', props, theme)}
    />
  )
}

function MenuItem(props: MenuItemProps) {
  const {
    value,
    children,
    active,
    itemIndex,
    isSubMenuItem,
    fade,
    ...otherProps
  } = props
  const menuItemRef = useRef<HTMLDivElement>()
  const theme = useTheme()
  const [menuState, setMenuState, parentMenuState, setParentMenuState] = useContext(MenuContext)
  const [subMenu, setSubMenu] = useState(null)
  const [subMenuState, setSubMenuState] = useState<MenuStateType>({ active: false, isSubMenuVisible: false })
  const menuValue = useMemo<MenuContextType>(() => [menuState, setMenuState, parentMenuState, setParentMenuState], [menuState, setMenuState, parentMenuState, setParentMenuState])
  const [height, setHeight] = useState(0)

  // Set height for the submenu's triangle
  useEffect(() => {
    // times 1.5 to make the triangle large enough
    setHeight(menuItemRef.current.offsetHeight * 1.5)
  }, [])

  // Find subMenu amongs children
  useEffect(() => {
    Children.forEach(children, (child: ReactElement) => {
      if (child?.type === Menu) {
        setSubMenu(child)
      }
    })
  }, [children])

  // Focus if active
  // Otherwise if subMenu is focused unfocus subMenu
  // Otherwise hide subMenu
  useEffect(() => {
    if (active && menuState.active) {
      menuItemRef.current.focus()
    }
  }, [active, menuState.active])

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
      setMenuState(x => ({
        ...x,
        value,
        event,
        renderedItem: children,
        shouldSyncWithParent: true,
      }))
    }
  }

  return (
    <Div
      ref={menuItemRef}
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
        onClick={event => {
          setMenuState(x => ({
            ...x,
            value,
            event,
            renderedItem: children,
            shouldSyncWithParent: true,
          }))
        }}
        onMouseEnter={() => {
          if (!(active && menuState.active)) {
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
        onMouseMove={() => {
          if (!(active && menuState.active)) {
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
        extend={resolvePartProps('menuItem', 'inner', props, theme)}
      >
        {Children.map(children, (child: ReactElement) => {
          if (child?.type === Menu) return null

          return child
        })}
        {subMenu && (
          <>
            <Span flexGrow={1} />
            <Icon
              ml={0.5}
              mr={-0.5}
              extend={resolvePartProps('menuItem', 'caret', props, theme)}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </Icon>
          </>
        )}
      </Div>
      {active && subMenu && menuState.isSubMenuVisible && (
        <>
          <MenuItemTriangle
            isTop
            size={height}
            position="absolute"
            top={-height}
            right={0}
          />
          <MenuContext.Provider value={menuValue}>
            {cloneElement(subMenu, {
              fade,
              isSubMenu: true,
              menuState: subMenuState,
              setMenuState: setSubMenuState,
              position: 'absolute',
              top: 0,
              left: '100%',
              ...subMenu.props,
            })}
          </MenuContext.Provider>
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

MenuItem.propTypes = propTypes

export default withHonorable<MenuItemProps>(MenuItem, 'menuItem')
