import { Children, KeyboardEvent, ReactElement, Ref, cloneElement, forwardRef, useContext, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'

import withHonorable from '../withHonorable'

import MenuContext, { MenuContextType, MenuStateDispatcherType, MenuStateType } from '../contexts/MenuContext'
import useForkedRef from '../hooks/useForkedRef'
import usePrevious from '../hooks/usePrevious'
import useOutsideClick from '../hooks/useOutsideClick'
import useRegisterProps from '../hooks/useRegisterProps'

import { Div, DivProps } from './tags'
import { MenuItem } from './MenuItem'

export type MenuProps = DivProps & {
  menuState?: MenuStateType
  setMenuState?: MenuStateDispatcherType
  isSubMenu?: boolean
  fade?: boolean
}

const propTypes = {
  menuState: PropTypes.object,
  setMenuState: PropTypes.func,
  isSubMenu: PropTypes.bool,
  fade: PropTypes.bool,
}

const sortEntries = ([keyA]: string[], [keyB]: string[]) => keyA.localeCompare(keyB)

function areEntriesIdentical(a: object, b: object) {
  if (!(a && b)) return false
  if (a === b) return true

  const aEntries = Object.entries(a)
  const bEntries = Object.entries(b)

  if (aEntries.length !== bEntries.length) {
    return false
  }

  aEntries.sort(sortEntries)
  bEntries.sort(sortEntries)

  return aEntries.every(([key, value], i) => bEntries[i][0] === key && bEntries[i][1] === value)
}

const defaultMenuState: MenuStateType = {
  activeItemIndex: -1,
  active: false,
  event: null,
  value: null,
  isSubMenuVisible: false,
  renderedItem: null,
  shouldFocus: false,
  shouldSyncWithParent: false,
}

function MenuRef({
  honorableId,
  menuState: initialMenuState = {},
  setMenuState: setInitialMenuState,
  fade,
  isSubMenu,
  children,
  ...props
}: MenuProps,
ref: Ref<any>
) {
  const menuRef = useRef<HTMLDivElement>()
  const forkedRef = useForkedRef(ref, menuRef)
  const [parentMenuState, setParentMenuState] = useContext(MenuContext)
  const [menuState, setMenuState] = useState<MenuStateType>({ ...defaultMenuState, ...initialMenuState })
  const menuValue = useMemo<MenuContextType>(() => [menuState, setMenuState, parentMenuState, setParentMenuState], [menuState, parentMenuState, setParentMenuState])
  const previousMenuState = usePrevious(menuState) || menuState
  const previousInitialMenuState = usePrevious(initialMenuState) || initialMenuState

  // Give `active` and `activeItemIndex` and other props to customProps
  useRegisterProps('Menu', menuState, honorableId)

  // On outside click, unset active item
  useOutsideClick(menuRef, () => {
    setMenuState(x => ({ ...x, activeItemIndex: -1, isSubMenuVisible: false }))
  })

  useEffect(() => {
    if (menuState.shouldFocus) {
      menuRef.current.focus()

      setMenuState(x => ({
        ...x,
        active: true,
        shouldFocus: false,
        activeItemIndex: typeof x.activeItemIndex === 'number' ? x.activeItemIndex : -1,
      }))
    }
  }, [menuState.shouldFocus])

  // Sync parent menu state with menu state
  useEffect(() => {
    if (typeof setInitialMenuState === 'function' && !areEntriesIdentical(previousMenuState, menuState)) {
      setInitialMenuState(x => ({
        ...x,
        ...menuState,
      }))
    }
    else if (typeof initialMenuState === 'object' && initialMenuState && !areEntriesIdentical(previousInitialMenuState, initialMenuState)) {
      setMenuState(x => ({
        ...x,
        ...initialMenuState,
      }))
    }
  }, [previousInitialMenuState, initialMenuState, setInitialMenuState, previousMenuState, menuState])

  // Sync menu state with grand parent menu state
  useEffect(() => {
    if (typeof setParentMenuState === 'function' && menuState.shouldSyncWithParent) {
      setParentMenuState(x => ({
        ...x,
        value: menuState.value,
        event: menuState.event,
        renderedItem: menuState.renderedItem,
        shouldSyncWithParent: true,
      }))
      setMenuState(x => ({
        ...x,
        shouldSyncWithParent: false,
        activeItemIndex: -1,
      }))
    }
  }, [menuState, parentMenuState, setParentMenuState])

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
    setMenuState(x => ({ ...x, active: false, activeItemIndex: -1, isSubMenuVisible: false }))
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
          ref={forkedRef}
          tabIndex={0}
          display="inline-block"
          {...props}
          onKeyDown={event => {
            handleKeyDown(event)
            if (typeof props.onKeyDown === 'function') props.onKeyDown(event)
          }}
          onMouseLeave={event => {
            handleMouseLeave()
            if (typeof props.onMouseLeave === 'function') props.onMouseLeave(event)
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

MenuRef.displayName = 'Menu'

const ForwardedMenu = forwardRef(MenuRef)

ForwardedMenu.propTypes = propTypes

export const Menu = withHonorable<MenuProps>(ForwardedMenu, 'Menu')
