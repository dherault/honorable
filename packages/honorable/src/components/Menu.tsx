import { Children, KeyboardEvent, ReactElement, ReactNode, cloneElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import MenuContext, { MenuContextType, MenuStateDispatcherType, MenuStateType } from '../contexts/MenuContext'
import usePrevious from '../hooks/usePrevious'
import useOutsideClick from '../hooks/useOutsideClick'

import { Div } from './tags'
import MenuItem from './MenuItem'

type MenuProps = ElementProps<'div'> & {
  children: ReactNode
  menuState?: MenuStateType
  setMenuState?: MenuStateDispatcherType
  // setUpdated?: () => unknown
  isSubMenu?: boolean
  fade?: boolean
}

const propTypes = {
  children: PropTypes.node.isRequired,
  menuState: PropTypes.object,
  setMenuState: PropTypes.func,
  // setUpdated: PropTypes.func,
  isSubMenu: PropTypes.bool,
  fade: PropTypes.bool,
}

function Menu({
  menuState: initialMenuState,
  setMenuState: setInitialMenuState,
  // setUpdated,
  isSubMenu,
  fade,
  children,
  ...props
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement>()
  const [parentMenuState, setParentMenuState] = useContext(MenuContext)
  const [menuState, setMenuState] = useState<MenuStateType>(initialMenuState || {})
  const menuValue = useMemo<MenuContextType>(() => [menuState, setMenuState, parentMenuState, setParentMenuState], [menuState, parentMenuState, setParentMenuState])
  const previousInitialMenuState = usePrevious(initialMenuState) || initialMenuState

  const [hideTimeoutId, setHideTimeoutId] = useState<NodeJS.Timeout>()

  // On outside click, unset active item
  useOutsideClick(menuRef, () => setMenuState(x => ({ ...x, activeItemIndex: -1 })))

  // Sync parent menu state with menu state
  useEffect(() => {
    if (typeof setInitialMenuState === 'function') {
      setInitialMenuState(x => {
        if (x.active === menuState.active) return x

        return menuState
      })
    }
  }, [setInitialMenuState, menuState])

  // Sync menu state with parent menu state
  useEffect(() => {
    if (previousInitialMenuState !== initialMenuState) {
      setMenuState(x => initialMenuState || x)
    }
  }, [previousInitialMenuState, initialMenuState])

  // Handle up and down keys
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault()

    if (!menuState.active) return

    switch (event.key) {
      case 'ArrowUp': {
        const nextActiveItemIndex = Math.max(0, menuState.activeItemIndex - 1)

        if (menuState.activeItemIndex !== nextActiveItemIndex) {
          setMenuState(x => ({ ...x, activeItemIndex: nextActiveItemIndex, isSubMenuVisible: true }))
        }

        break
      }
      case 'ArrowDown': {
        const nextActiveItemIndex = Math.min(Children.count(children) - 1, menuState.activeItemIndex + 1)

        if (menuState.activeItemIndex !== nextActiveItemIndex) {
          setMenuState(x => ({ ...x, activeItemIndex: nextActiveItemIndex, isSubMenuVisible: true }))
        }

        break
      }
    }
  }

  // On mouse leave, unset the active item
  // Give it a timeout to allow mouse rip
  function handleMouseLeave() {
    setHideTimeoutId(
      setTimeout(() => {
        setMenuState(x => ({ ...x, active: false, activeItemIndex: -1, isSubMenuVisible: false }))
      }, 330)
    )
  }

  // On mouse enter, clear the mouse leave timeout
  function handleMouseEnter() {
    clearTimeout(hideTimeoutId)
  }

  function wrapFade(element: ReactElement) {
    if (!fade) return element

    const duration = 330

    const defaultStyle = {
      position: 'relative',
      top: -4,
      opacity: 0,
      transition: `opacity ${duration}ms ease, top ${duration}ms ease`,
    }

    const transitionStyles = {
      entering: { opacity: 1, top: 0 },
      entered: { opacity: 1, top: 0 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
    }

    return (
      <Transition
        in
        appear
        timeout={duration}
      >
        {(state: string) => cloneElement(element, {
          ...element.props,
          ...defaultStyle,
          ...transitionStyles[state],
        })}
      </Transition>
    )
  }

  return (
    <MenuContext.Provider value={menuValue}>
      {wrapFade(
        <Div
          ref={menuRef}
          tabIndex={0}
          display="inline-block"
          {...props}
        // style={{ backgroundColor: menuState.active ? 'pink' : 'transparent' }}
          onKeyDown={event => {
            handleKeyDown(event)
            if (typeof props.onKeyDown === 'function') props.onKeyDown(event)
          }}
          onMouseLeave={event => {
            handleMouseLeave()
            if (typeof props.onMouseLeave === 'function') props.onMouseLeave(event)
          }}
          onMouseEnter={event => {
            handleMouseEnter()
            if (typeof props.onMouseEnter === 'function') props.onMouseEnter(event)
          }}
        >
          {Children.map(children, (child: ReactElement, index) => {
          // If child is a MenuItem, give it some more props
            if (child.type === MenuItem) {
              return cloneElement(child, {
                fade,
                isSubMenuItem: isSubMenu,
                itemIndex: index,
                active: index === menuState.activeItemIndex,
                ...child.props,
              })
            }

            return child
          })}
        </Div>
      )}
    </MenuContext.Provider>
  )
}

Menu.propTypes = propTypes

export default withHonorable<MenuProps>(Menu, 'menu')
