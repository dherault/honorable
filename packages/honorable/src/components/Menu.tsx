import { Children, KeyboardEvent, ReactElement, ReactNode, cloneElement, useEffect, useMemo, useRef, useState } from 'react'
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
  startActiveItemIndex?: number
}

const propTypes = {
  children: PropTypes.node.isRequired,
  menuState: PropTypes.object,
  setMenuState: PropTypes.func,
  setUpdated: PropTypes.func,
  isSubMenu: PropTypes.bool,
  startActiveItemIndex: PropTypes.number,
}

function Menu({
  menuState: initialMenuState = {},
  setMenuState: setInitialMenuState,
  setUpdated,
  isSubMenu,
  startActiveItemIndex = -1,
  children,
  ...props
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement>()
  const [menuState, setMenuState] = useState<MenuStateType>({ ...initialMenuState, activeItemIndex: startActiveItemIndex })
  const menuValue = useMemo<MenuContextType>(() => [menuState, setMenuState], [menuState])
  const previousActualSelected = usePrevious(menuState) || menuState
  const [hideTimeoutId, setHideTimeoutId] = useState<NodeJS.Timeout>()

  useOutsideClick(menuRef, () => setMenuState(x => ({ ...x, activeItemIndex: -1 })))

  useEffect(() => {
    if (typeof setInitialMenuState === 'function' && (initialMenuState.value !== menuState.value || initialMenuState.renderedItem !== menuState.renderedItem)) {
      setInitialMenuState(menuState)
    }
  }, [menuState, initialMenuState, setInitialMenuState])

  useEffect(() => {
    if (typeof setUpdated === 'function' && menuState !== previousActualSelected) {
      setUpdated()
    }
  }, [menuState, previousActualSelected, setUpdated])

  useEffect(() => {
    if (initialMenuState.focused) {
      setMenuState(x => ({ ...x, focused: true }))
    }
  }, [initialMenuState.focused, setMenuState])

  useEffect(() => {
    if (menuState.focused) menuRef.current.focus()
  }, [menuState.focused])

  useEffect(() => {
    if (startActiveItemIndex > -1) {
      setMenuState(x => ({ ...x, activeItemIndex: startActiveItemIndex }))
    }
  }, [startActiveItemIndex])

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault()

    if (!menuState.focused) return

    switch (event.key) {
      case 'ArrowUp': {
        setMenuState(x => ({ ...x, activeItemIndex: Math.max(0, x.activeItemIndex - 1) }))
        break
      }
      case 'ArrowDown': {
        setMenuState(x => ({ ...x, activeItemIndex: Math.min(Children.count(children) - 1, x.activeItemIndex + 1) }))
        break
      }
    }
  }

  function handleMouseLeave() {
    setHideTimeoutId(
      setTimeout(() => {
        setMenuState(x => ({ ...x, activeItemIndex: -1 }))
      }, 330)
    )
  }

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
