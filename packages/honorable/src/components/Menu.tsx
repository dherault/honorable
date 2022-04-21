import { Children, ReactElement, ReactNode, cloneElement, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import useKeys from 'react-piano-keys'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import MenuContext, { MenuContextType, MenuStateDispatcherType, MenuStateType } from '../contexts/MenuContext'
import usePrevious from '../hooks/usePrevious'

import { Div } from './tags'
import MenuItem from './MenuItem'

type MenuProps = ElementProps<'div'> & {
  children: ReactNode
  menuState?: MenuStateType
  setMenuState?: MenuStateDispatcherType
  setUpdated?: () => unknown
}

const propTypes = {
  children: PropTypes.node.isRequired,
  menuState: PropTypes.object,
  setMenuState: PropTypes.func,
  setUpdated: PropTypes.func,
}

function Menu({
  menuState,
  setMenuState,
  setUpdated,
  children,
  ...props
}: MenuProps) {
  const menuRef = useRef()
  const [activeItemIndex, setActiveItemIndex] = useState(-1)
  const [actualMenuState, setActualMenuState] = useState<MenuStateType>({ ...menuState, activeItemIndex })
  const menuValue = useMemo<MenuContextType>(() => [actualMenuState, setActualMenuState], [actualMenuState, setActualMenuState])
  const previousActualSelected = usePrevious(actualMenuState) || actualMenuState

  useKeys(menuRef.current, 'up', () => handleKey('up'))
  useKeys(menuRef.current, 'down', () => handleKey('down'))

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

  function handleKey(key: string) {
    console.log('key', key)
  }

  return (
    <MenuContext.Provider value={menuValue}>
      <Div
        ref={menuRef}
        display="inline-block"
        {...props}
      >
        {Children.map(children, (child: ReactElement, index) => {
          if (child.type === MenuItem) {

            return cloneElement(child, { ...child.props, itemIndex: index })
          }

          return child
        })}
      </Div>
    </MenuContext.Provider>
  )
}

Menu.propTypes = propTypes

export default withHonorable<MenuProps>(Menu, 'menu')
