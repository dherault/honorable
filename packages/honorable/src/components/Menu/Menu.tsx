import { Children, KeyboardEvent, ReactElement, Ref, cloneElement, forwardRef, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'

import { ComponentProps } from '../../types.js'

import MenuContext, { MenuContextType, MenuStateDispatcherType, MenuStateType } from '../../contexts/MenuContext.js'

import useTheme from '../../hooks/useTheme.js'
import useForkedRef from '../../hooks/useForkedRef.js'
import useOutsideClick from '../../hooks/useOutsideClick.js'
import useRootStyles from '../../hooks/useRootStyles.js'

import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import { Div } from '../tags.js'
import { MenuItem } from '../MenuItem/MenuItem.js'

export const menuParts: readonly string[] = [] as const

export const menuPropTypes = {
  menuState: PropTypes.object,
  setMenuState: PropTypes.func,
  isSubMenu: PropTypes.bool,
  fade: PropTypes.bool,
  open: PropTypes.bool,
  transtionDuration: PropTypes.number,
  noFocus: PropTypes.bool,
  noFocusLoss: PropTypes.bool,
  noOutsideClick: PropTypes.bool,
}

export type MenuBaseProps = {
  menuState?: MenuStateType
  setMenuState?: MenuStateDispatcherType
  isSubMenu?: boolean
  fade?: boolean
  open?: boolean
  transtionDuration?: number
  noFocus?: boolean
  noFocusLoss?: boolean
  noOutsideClick?: boolean
}

export type MenuProps = ComponentProps<MenuBaseProps, 'div', typeof menuParts[number]>

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
    fade = false,
    open = true,
    isSubMenu = false,
    transtionDuration = 300,
    children,
    noFocus = false,
    noFocusLoss = false,
    noOutsideClick = false,
    ...otherProps
  } = props
  const theme = useTheme()
  const menuRef = useRef<HTMLDivElement>(null)
  const forkedRef = useForkedRef(ref, menuRef)
  const [menuState, setMenuState] = useState<MenuStateType>({})
  const [parentMenuState, setParentMenuState] = useContext(MenuContext)
  const actualMenuState = useMemo(() => enhanceWithDefault(initialMenuState ?? menuState), [initialMenuState, menuState])
  const setActualMenuState = useMemo(() => setInitialMenuState ?? setMenuState, [setInitialMenuState, setMenuState])
  const menuValue = useMemo<MenuContextType>(() => [actualMenuState, setActualMenuState, parentMenuState, setParentMenuState], [actualMenuState, setActualMenuState, parentMenuState, setParentMenuState])

  const actualActiveItemIndex = ((actualMenuState.defaultActiveItemIndex ?? -1) > -1 && actualMenuState.activeItemIndex === -1
    ? actualMenuState.defaultActiveItemIndex
    : actualMenuState.activeItemIndex) ?? -1

  const actualOpen = open ?? true
  const [transitionOpen, setTransitionOpen] = useState(actualOpen)

  const workingProps = { ...props, fade, open: actualOpen, isSubMenu, transtionDuration, noFocus, noFocusLoss, noOutsideClick, ...actualMenuState }
  const rootStyles = useRootStyles('Menu', workingProps, theme)

  const handleOutsideClick = useCallback(() => {
    if (noOutsideClick) return

    setActualMenuState((x: MenuStateType) => ({ ...x, activeItemIndex: -1, isSubMenuVisible: false }))
  }, [noOutsideClick, setActualMenuState])

  // Handle up and down keys
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    event.preventDefault()

    if (!actualMenuState.active || actualMenuState.locked) return

    switch (event.key) {
      case 'ArrowUp': {
        const nextActiveItemIndex = Math.max(0, actualActiveItemIndex - 1)

        if (actualActiveItemIndex !== nextActiveItemIndex) {
          setActualMenuState((x: MenuStateType) => ({ ...x, activeItemIndex: nextActiveItemIndex, isSubMenuVisible: true }))
        }

        break
      }
      case 'ArrowDown': {
        const nextActiveItemIndex = Math.min(Children.count(children) - 1, actualActiveItemIndex + 1)

        if (actualActiveItemIndex !== nextActiveItemIndex) {
          setActualMenuState((x: MenuStateType) => ({ ...x, activeItemIndex: nextActiveItemIndex, isSubMenuVisible: true }))
        }

        break
      }
    }
  }, [actualActiveItemIndex, actualMenuState.active, actualMenuState.locked, children, setActualMenuState])

  // On mouse leave, unset the active item
  const handleMouseLeave = useCallback(() => {
    if (noFocusLoss) return

    setActualMenuState((x: MenuStateType) => ({ ...x, active: false, activeItemIndex: -1, isSubMenuVisible: false }))
  }, [noFocusLoss, setActualMenuState])

  const wrapFade = useCallback((element: ReactElement) => {
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
        onEntered={() => setActualMenuState((x: MenuStateType) => ({ ...x, locked: false }))}
        onExit={() => setActualMenuState((x: MenuStateType) => ({ ...x, locked: true }))}
      >
        {(state: string) => cloneElement(element, {
          ...element.props,
          ...defaultStyle,
          ...transitionStyles[state as keyof typeof transitionStyles],
        })}
      </Transition>
    )
  }, [actualOpen, fade, transtionDuration, setActualMenuState])

  // On outside click, unset active item
  useOutsideClick(menuRef, handleOutsideClick)

  useEffect(() => {
    if (!menuRef.current) return

    if (actualMenuState.shouldFocus) {
      menuRef.current.focus()

      setActualMenuState((x: MenuStateType) => ({
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
      setActualMenuState((x: MenuStateType) => ({
        ...x,
        active: false,
        activeItemIndex: -1,
        shouldSyncWithParent: false,
      }))
    }
  }, [actualMenuState.shouldSyncWithParent, setActualMenuState, setParentMenuState])

  useEffect(() => {
    if (!actualOpen) {
      setActualMenuState((x: MenuStateType) => ({ ...x, activeItemIndex: -1, isSubMenuVisible: false }))

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
      setActualMenuState((x: MenuStateType) => ({ ...x, active: true }))
      setTransitionOpen(true)
    }
  }, [actualOpen, fade, transtionDuration, setActualMenuState])

  if (!(actualOpen || transitionOpen)) return null

  return (
    <MenuContext.Provider value={menuValue}>
      {wrapFade(
        <Div
          ref={forkedRef}
          tabIndex={0}
          display="inline-block"
          {...rootStyles}
          {...filterUndefinedValues(otherProps)}
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
                noFocus,
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

const BaseMenu = forwardRef(MenuRef)

BaseMenu.displayName = 'Menu'
BaseMenu.propTypes = menuPropTypes

export const Menu = memo(BaseMenu)
