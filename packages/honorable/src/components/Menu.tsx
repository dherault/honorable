import { Children, KeyboardEvent, ReactElement, ReactNode, cloneElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

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
  setUpdated?: () => unknown
  isSubMenu?: boolean
}

const propTypes = {
  children: PropTypes.node.isRequired,
  menuState: PropTypes.object,
  setMenuState: PropTypes.func,
  setUpdated: PropTypes.func,
  isSubMenu: PropTypes.bool,
}

function Menu({
  menuState: initialMenuState,
  setMenuState: setInitialMenuState,
  setUpdated,
  isSubMenu,
  children,
  ...props
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement>()
  const [parentMenuState, setParentMenuState] = useContext(MenuContext)
  const [menuState, setMenuState] = useState<MenuStateType>(initialMenuState || {})
  const menuValue = useMemo<MenuContextType>(() => [menuState, setMenuState, parentMenuState, setParentMenuState], [menuState, parentMenuState, setParentMenuState])
  // const previousActualSelected = usePrevious(menuState) || menuState
  // const previousInitialMenuState = usePrevious(initialMenuState) || initialMenuState

  const [hideTimeoutId, setHideTimeoutId] = useState<NodeJS.Timeout>()

  // console.log('menuState', menuState, initialMenuState)

  // On outside click, unset active item
  useOutsideClick(menuRef, () => setMenuState(x => ({ ...x, activeItemIndex: -1 })))

  useEffect(() => {
    console.log('effect')
    // if (previousInitialMenuState !== initialMenuState) {
    setMenuState(initialMenuState || {})
    // }
  }, [initialMenuState])
  // Give the parent menuState the current value of the menuState
  // useEffect(() => {
  //   if (typeof setInitialMenuState === 'function' && (initialMenuState.value !== menuState.value || initialMenuState.renderedItem !== menuState.renderedItem)) {
  //     setInitialMenuState({
  //       ...initialMenuState ,
  //       ...menuState,
  //     })
  //   }
  // }, [menuState, initialMenuState, setInitialMenuState])

  // For select
  // // TODO is this necessary?
  // useEffect(() => {
  //   if (typeof setUpdated === 'function' && menuState !== previousActualSelected) {
  //     setUpdated()
  //   }
  // }, [menuState, previousActualSelected, setUpdated])

  // If the parent forces the focus, focus
  // useEffect(() => {
  //   setMenuState(x => ({ ...x, focused: initialMenuState.focused }))
  // }, [initialMenuState.focused, setMenuState])

  // If focused by props, focus element
  useEffect(() => {
    if (menuState.focused && menuState.activeItemIndex === -1) menuRef.current.focus()
  }, [menuState.focused, menuState.activeItemIndex])

  // Sync activeItemIndex from parent
  // useEffect(() => {
  //   setMenuState(x => ({ ...x, activeItemIndex: initialMenuState.activeItemIndex }))
  // }, [initialMenuState.activeItemIndex])

  // Handle up and down keys
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault()

    if (!menuState.focused) return

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
        setMenuState(x => ({ ...x, activeItemIndex: -1 }))
      }, 330)
    )
  }

  // On mouse enter, clear the mouse leave timeout
  function handleMouseEnter() {
    clearTimeout(hideTimeoutId)
  }

  return (
    <MenuContext.Provider value={menuValue}>
      <Div
        ref={menuRef}
        tabIndex={0}
        display="inline-block"
        {...props}
        style={{ backgroundColor: menuState.focused ? 'pink' : 'transparent' }}
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
          if (child.type === MenuItem) {
            return cloneElement(child, {
              isSubMenuItem: isSubMenu,
              itemIndex: index,
              active: index === menuState.activeItemIndex,
              ...child.props,
            })
          }

          return child
        })}
      </Div>
    </MenuContext.Provider>
  )
}

Menu.propTypes = propTypes

export default withHonorable<MenuProps>(Menu, 'menu')
