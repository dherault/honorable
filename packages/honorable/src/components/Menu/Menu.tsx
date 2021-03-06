import { Children, KeyboardEvent, ReactElement, Ref, cloneElement, forwardRef, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'

import MenuContext, { MenuContextType, MenuStateDispatcherType, MenuStateType } from '../../contexts/MenuContext'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'
import useOutsideClick from '../../hooks/useOutsideClick'
import useRootStyles from '../../hooks/useRootStyles'

import { Div, DivProps } from '../tags'
import { MenuItem } from '../MenuItem/MenuItem'

export type MenuBaseProps = {
  menuState?: MenuStateType
  setMenuState?: MenuStateDispatcherType
  isSubMenu?: boolean
  fade?: boolean
  open?: boolean
  transtionDuration?: number
}

export type MenuProps = DivProps & MenuBaseProps

export const menuPropTypes = {
  menuState: PropTypes.object,
  setMenuState: PropTypes.func,
  isSubMenu: PropTypes.bool,
  fade: PropTypes.bool,
  open: PropTypes.bool,
  transtionDuration: PropTypes.number,
}

const defaultMenuState: MenuStateType = {
  activeItemIndex: -1,
  defaultActiveItemIndex: -1,
  active: false,
  isSubMenuVisible: false,
  shouldFocus: false,
  shouldSyncWithParent: false,
  locked: false,
}

function enhanceWithDefault(menuState: MenuStateType) {
  return { ...defaultMenuState, ...menuState }
}

function MenuRef(props: MenuProps, ref: Ref<any>) {
  const {
    menuState: initialMenuState,
    setMenuState: setInitialMenuState,
    fade,
    open,
    isSubMenu,
    transtionDuration = 300,
    children,
    ...otherProps
  } = props
  const theme = useTheme()
  const menuRef = useRef<HTMLDivElement>()
  const forkedRef = useForkedRef(ref, menuRef)
  const [menuState, setMenuState] = useState<MenuStateType>({})
  const [parentMenuState, setParentMenuState] = useContext(MenuContext)
  const actualMenuState = useMemo(() => enhanceWithDefault(initialMenuState ?? menuState), [initialMenuState, menuState])
  const setActualMenuState = useMemo(() => setInitialMenuState ?? setMenuState, [setInitialMenuState, setMenuState])
  const menuValue = useMemo<MenuContextType>(() => [actualMenuState, setActualMenuState, parentMenuState, setParentMenuState], [actualMenuState, setActualMenuState, parentMenuState, setParentMenuState])

  const actualActiveItemIndex = actualMenuState.defaultActiveItemIndex > -1 && actualMenuState.activeItemIndex === -1
    ? actualMenuState.defaultActiveItemIndex
    : actualMenuState.activeItemIndex

  const actualOpen = open ?? true
  const [transitionOpen, setTransitionOpen] = useState(actualOpen)

  const workingProps = { ...props, ...actualMenuState }
  const rootStyles = useRootStyles('Menu', workingProps, theme)

  // On outside click, unset active item
  useOutsideClick(menuRef, () => {
    setActualMenuState(x => ({ ...x, activeItemIndex: -1, isSubMenuVisible: false }))
  })

  useEffect(() => {
    if (!menuRef.current) return

    if (actualMenuState.shouldFocus) {
      menuRef.current.focus()

      setActualMenuState(x => ({
        ...x,
        active: true,
        shouldFocus: false,
      }))
    }
  }, [actualMenuState.shouldFocus, setActualMenuState])

  useEffect(() => {
    if (actualMenuState.shouldSyncWithParent) {
      setParentMenuState(x => ({
        ...x,
        shouldSyncWithParent: true,
      }))
      setActualMenuState(x => ({
        ...x,
        active: false,
        activeItemIndex: -1,
        shouldSyncWithParent: false,
      }))
    }
  }, [actualMenuState.shouldSyncWithParent, setActualMenuState, setParentMenuState])

  useEffect(() => {
    if (!actualOpen) {
      setActualMenuState(x => ({ ...x, activeItemIndex: -1, isSubMenuVisible: false }))

      if (fade) {
        setTimeout(() => {
          setTransitionOpen(false)
        }, transtionDuration)
      }
      else {
        setTransitionOpen(false)
      }
    }
    else {
      setActualMenuState(x => ({ ...x, active: true }))
      setTransitionOpen(true)
    }
  }, [actualOpen, fade, transtionDuration, setActualMenuState])

  // Handle up and down keys
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault()

    if (!actualMenuState.active || actualMenuState.locked) return

    switch (event.key) {
      case 'ArrowUp': {
        const nextActiveItemIndex = Math.max(0, actualActiveItemIndex - 1)

        if (actualActiveItemIndex !== nextActiveItemIndex) {
          setActualMenuState(x => ({ ...x, activeItemIndex: nextActiveItemIndex, isSubMenuVisible: true }))
        }

        break
      }
      case 'ArrowDown': {
        const nextActiveItemIndex = Math.min(Children.count(children) - 1, actualActiveItemIndex + 1)

        if (actualActiveItemIndex !== nextActiveItemIndex) {
          setActualMenuState(x => ({ ...x, activeItemIndex: nextActiveItemIndex, isSubMenuVisible: true }))
        }

        break
      }
    }
  }

  // On mouse leave, unset the active item
  function handleMouseLeave() {
    setActualMenuState(x => ({ ...x, active: false, activeItemIndex: -1, isSubMenuVisible: false }))
  }

  function wrapFade(element: ReactElement) {
    if (!fade) return element

    const defaultStyle = {
      opacity: 0,
      transition: `opacity ${transtionDuration}ms ease`,
    }

    const transitionStyles = {
      entering: { opacity: 1 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
    }

    return (
      <Transition
        in={actualOpen}
        appear
        timeout={transtionDuration}
        onEntered={() => setActualMenuState(x => ({ ...x, locked: false }))}
        onExit={() => setActualMenuState(x => ({ ...x, locked: true }))}
      >
        {(state: string) => cloneElement(element, {
          ...element.props,
          ...defaultStyle,
          ...transitionStyles[state],
        })}
      </Transition>
    )
  }

  if (!(actualOpen || transitionOpen)) return null

  return (
    <MenuContext.Provider value={menuValue}>
      {wrapFade(
        <Div
          ref={forkedRef}
          tabIndex={0}
          display="inline-block"
          {...rootStyles}
          {...otherProps}
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
            if (child?.type === MenuItem) {
              return cloneElement(child, {
                fade,
                isSubMenuItem: isSubMenu,
                itemIndex: index,
                active: index === actualActiveItemIndex,
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

export const Menu = forwardRef(MenuRef)

Menu.displayName = 'Menu'
Menu.propTypes = menuPropTypes
