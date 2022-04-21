import { Children, KeyboardEvent, ReactElement, ReactNode, cloneElement, useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import MenuContext, { MenuStateType } from '../contexts/MenuContext'
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
  children?: ReactNode
}

const propTypes = {
  value: PropTypes.any,
  itemIndex: PropTypes.number,
  active: PropTypes.bool,
  isSubMenuItem: PropTypes.bool,
  onClick: PropTypes.func,
}

function MenuItem(props: MenuItemProps) {
  const {
    value,
    children,
    active,
    itemIndex,
    isSubMenuItem,
    ...otherProps
  } = props
  const menuItemRef = useRef<HTMLDivElement>()
  const theme = useTheme()
  const [menuState, setMenuState] = useContext(MenuContext)
  const [subMenu, setSubMenu] = useState(null)
  const [subMenuState, setSubMenuState] = useState<MenuStateType>({})
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(true)

  // If selected but not rendered, render it
  useEffect(() => {
    if (menuState && menuState.value === value && !menuState.renderedItem) {
      setMenuState({
        ...menuState,
        value,
        renderedItem: children,
      })
    }
  }, [menuState, setMenuState, value, children])

  // Find subMenu amongs children
  useEffect(() => {
    Children.forEach(children, (child: ReactElement) => {
      if (child?.type === Menu) {
        setSubMenu(child)
      }
    })
  }, [children])

  // Focus if active
  // Otherwise unfocus subMenu
  useEffect(() => {
    if (active) menuItemRef.current.focus()
    else if (subMenuState.focused) setSubMenuState(x => ({ ...x, focused: false }))
  }, [active, subMenuState.focused])

  // On right key, focus subMenu
  // On left key, unfocus menu
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault()

    if (!active) return

    if (subMenu && event.key === 'ArrowRight') {
      setMenuState(x => ({ ...x, focused: false }))
      setSubMenuState(x => ({ ...x, focused: true }))
      setIsSubMenuVisible(true)
    }
    else if (isSubMenuItem && event.key === 'ArrowLeft') {
      setMenuState(x => ({ ...x, focused: true }))
      setIsSubMenuVisible(false)
    }
  }

  if (active) {
    console.log('active isSubMenuVisible', itemIndex, isSubMenuVisible)
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
          }))
        }}
        onMouseEnter={() => {
          if (menuState.activeItemIndex !== itemIndex) {
            setMenuState(x => ({
              ...x,
              focused: true,
              activeItemIndex: itemIndex,
            }))
          }
        }}
        onMouseMove={() => {
          if (menuState.activeItemIndex !== itemIndex) {
            setMenuState(x => ({
              ...x,
              focused: true,
              activeItemIndex: itemIndex,
            }))
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
      {active && subMenu && isSubMenuVisible && cloneElement(subMenu, {
        isSubMenu: true,
        menuState: subMenuState,
        setMenuState: setSubMenuState,
        startActiveItemIndex: subMenuState.focused ? 0 : -1,
        position: 'absolute',
        top: 0,
        left: '100%',
        ...subMenu.props,
      })}
    </Div>
  )
}

MenuItem.propTypes = propTypes

export default withHonorable<MenuItemProps>(MenuItem, 'menuItem')
