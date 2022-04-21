import { Children, KeyboardEvent, MouseEvent, ReactElement, ReactNode, cloneElement, useEffect, useMemo, useRef, useState } from 'react'
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
  focused?: boolean
}

const propTypes = {
  children: PropTypes.node.isRequired,
  menuState: PropTypes.object,
  setMenuState: PropTypes.func,
  setUpdated: PropTypes.func,
  focused: PropTypes.bool,
}

function Menu({
  focused,
  menuState,
  setMenuState,
  setUpdated,
  children,
  ...props
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement>()
  const [actualMenuState, setActualMenuState] = useState<MenuStateType>({ ...menuState, activeItemIndex: -1 })
  const menuValue = useMemo<MenuContextType>(() => [actualMenuState, setActualMenuState], [actualMenuState, setActualMenuState])
  const previousActualSelected = usePrevious(actualMenuState) || actualMenuState

  useOutsideClick(menuRef, () => setActualMenuState(x => ({ ...x, activeItemIndex: -1 })))

  useEffect(() => {
    if (typeof setMenuState === 'function' && (menuState.value !== actualMenuState.value || menuState.renderedItem !== actualMenuState.renderedItem)) {
      setMenuState(actualMenuState)
    }
  }, [actualMenuState, menuState, setMenuState])

  useEffect(() => {
    if (typeof setUpdated === 'function' && actualMenuState !== previousActualSelected) {
      setUpdated()
    }
  }, [actualMenuState, previousActualSelected, setUpdated])

  useEffect(() => {
    if (focused) menuRef.current.focus()
  }, [focused])

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault()

    switch (event.key) {
      case 'ArrowUp': {
        setActualMenuState(x => ({ ...x, activeItemIndex: Math.max(0, x.activeItemIndex - 1) }))
        break
      }
      case 'ArrowDown': {
        setActualMenuState(x => ({ ...x, activeItemIndex: Math.min(Children.count(children) - 1, x.activeItemIndex + 1) }))
        break
      }
    }
  }

  function handleMouseLeave() {
    setActualMenuState(x => ({ ...x, activeItemIndex: -1 }))
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
      >
        {Children.map(children, (child: ReactElement, index) => {
          if (child.type === MenuItem) {

            return cloneElement(child, {
              ...child.props,
              itemIndex: index,
              active: index === actualMenuState.activeItemIndex,
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
