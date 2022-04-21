import { MouseEvent, ReactNode, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import MenuContext from '../contexts/MenuContext'
import enhanceEventTarget from '../utils/enhanceEventTarget'

import { Div } from './tags'

type MenuItemProps = ElementProps<'div'> & {
  value?: any
  itemIndex?: number
  onClick?: (event: MouseEvent) => void
  children?: ReactNode
}

const propTypes = {
  value: PropTypes.any,
  onClick: PropTypes.func,
  itemIndex: PropTypes.number,
}

function MenuItem({ value, onClick, children, itemIndex, ...props }: MenuItemProps) {
  const [menuState, setMenuState] = useContext(MenuContext)

  useEffect(() => {
    if (menuState && typeof menuState.registerItem === 'function') {
      menuState.registerItem(itemIndex, value)
    }
  }, [menuState, itemIndex, value])

  useEffect(() => {
    // If selected but not rendered, render it
    if (menuState && menuState.value === value && !menuState.renderedItem) {
      setMenuState({
        ...menuState,
        value,
        renderedItem: children,
      })
    }
  }, [menuState, setMenuState, value, children])

  return (
    <Div
      cursor="pointer"
      userSelect="none"
      {...props}
      onClick={event => {
        setMenuState(x => ({
          ...x,
          value,
          event,
          renderedItem: children,
        }))
        if (typeof onClick === 'function') onClick(enhanceEventTarget(event, { value }))
      }}
    >
      {children}
    </Div>
  )
}

MenuItem.propTypes = propTypes

export default withHonorable<MenuItemProps>(MenuItem, 'menuItem')
