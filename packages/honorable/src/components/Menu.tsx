import { Children, ReactElement, ReactNode, cloneElement, useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

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

function Menu({ menuState, setMenuState, setUpdated, children, ...props }: MenuProps) {
  const [registeredItems, setRegisteredItems] = useState([])
  const registerItem = useCallback((index: number, value: any) => {
    setRegisteredItems(x => {
      const nextRegisteredtems = x.slice()

      nextRegisteredtems[index] = value

      return nextRegisteredtems
    })
  }, [])
  const [actualMenuState, setActualMenuState] = useState<MenuStateType>({ ...menuState, registerItem })
  const menuValue = useMemo<MenuContextType>(() => [actualMenuState, setActualMenuState], [actualMenuState, setActualMenuState])
  const previousActualSelected = usePrevious(actualMenuState) || actualMenuState

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

  console.log('registeredItems', registeredItems)

  return (
    <MenuContext.Provider value={menuValue}>
      <Div
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
