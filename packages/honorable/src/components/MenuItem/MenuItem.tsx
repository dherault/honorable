import { Children, KeyboardEvent, MouseEvent, ReactElement, Ref, cloneElement, forwardRef, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps } from '../../types.js'

import MenuContext, { MenuStateType } from '../../contexts/MenuContext.js'
import MenuUsageContext from '../../contexts/MenuUsageContext.js'

import useTheme from '../../hooks/useTheme.js'
import useForkedRef from '../../hooks/useForkedRef.js'
import useRootStyles from '../../hooks/useRootStyles.js'

import resolvePartStyles from '../../resolvers/resolvePartStyles.js'

import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import { Div, Span } from '../tags.js'
import { Menu } from '../Menu/Menu.js'
import { Caret } from '../Caret/Caret.js'

export const menuItemParts = ['Children', 'Caret'] as const

export const menuItemPropTypes = {
  value: PropTypes.any,
  itemIndex: PropTypes.number,
  active: PropTypes.bool,
  isSubMenuItem: PropTypes.bool,
  fade: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  noFocus: PropTypes.bool,
}

export type MenuItemBaseProps = {
  value?: any
  itemIndex?: number
  active?: boolean
  isSubMenuItem?: boolean
  fade?: boolean
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void
  noFocus?: boolean
}

export type MenuItemProps = ComponentProps<MenuItemBaseProps, 'div', typeof menuItemParts[number]>

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
    onClick,
    noFocus,
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
    let subMenu: ReactElement | null = null

    Children.forEach(children, (child: ReactElement) => {
      if (!subMenu && child?.type === Menu) subMenu = child
    })

    return subMenu as ReactElement | null
  }, [children])

  const handleSelect = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (disabled || menuState.locked) return

    event.persist()

    setMenuUsageState(x => ({
      ...x,
      value,
      event,
      renderedItem: Children.toArray(children) as ReactElement[],
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

    if (typeof onClick === 'function') {
      onClick(event)
    }
  }, [disabled, menuState.locked, setMenuUsageState, setMenuState, setSubMenuState, value, children, onClick])

  // On right key, focus subMenu
  // On left key, unfocus menu
  // On enter key, select item
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
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
          menuItemRef.current?.focus()
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
      handleSelect(event as any as MouseEvent<HTMLDivElement>)
    }

    if (typeof props.onKeyDown === 'function') props.onKeyDown(event)
  }, [active, handleSelect, isSubMenuItem, menuState, setMenuState, setParentMenuState, setSubMenuState, subMenu, props])

  const handleMouseMove = useCallback(() => {
    if ((active && menuState.active && menuState.activeItemIndex === itemIndex) || menuState.locked) return

    setMenuState(x => ({
      ...x,
      active: true,
      activeItemIndex: itemIndex,
      isSubMenuVisible: true,
    }))
    setSubMenuState(x => ({ ...x, active: false, activeItemIndex: -1, isSubMenuVisible: false }))
    setParentMenuState(x => ({ ...x, active: false }))

    if (!noFocus) {
      menuItemRef.current?.focus()
    }
  }, [active, itemIndex, menuState, setMenuState, setParentMenuState, noFocus])

  // Set height for the submenu's triangle
  // times 1.5 to make the triangle large enough
  useEffect(() => {
    setHeight((menuItemRef.current?.offsetHeight ?? 0) * 1.5)
  }, [])

  // Focus if active
  // Otherwise if subMenu is focused unfocus subMenu
  // Otherwise hide subMenu
  useEffect(() => {
    if (!noFocus && active && menuState.active) {
      menuItemRef.current?.focus()
    }
  }, [noFocus, active, menuState.active])

  // Set renderedItem if value matches menuState.value
  // Used by selects with value set on
  useEffect(() => {
    if (menuUsageState.value !== value) return

    const renderedItem = Children.toArray(children) as ReactElement[]

    if (
      menuUsageState.renderedItem?.every((x, i) => {
        const y = renderedItem[i]

        return typeof x !== 'object' && typeof y !== 'object' ? x === y : x.type === y.type && x.key === y.key
      })
    ) return

    setMenuUsageState(x => ({ ...x, renderedItem }))
  }, [menuUsageState.value, menuUsageState.renderedItem, setMenuUsageState, value, children])

  return (
    <Div
      ref={forkedRef}
      position="relative"
      tabIndex={itemIndex}
      {...rootStyles}
      {...filterUndefinedValues(otherProps)}
      onKeyDown={handleKeyDown}
    >
      <Div
        display="flex"
        alignItems="center"
        cursor="pointer"
        userSelect="none"
        onClick={handleSelect}
        onMouseMove={handleMouseMove}
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
              marginLeft={8}
              marginRight={-8}
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

const BaseMenuItem = forwardRef(MenuItemRef)

BaseMenuItem.displayName = 'MenuItem'
BaseMenuItem.propTypes = menuItemPropTypes

export const MenuItem = memo(BaseMenuItem)
