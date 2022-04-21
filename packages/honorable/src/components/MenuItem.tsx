import { ReactNode, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import MenuContext from '../contexts/MenuContext'
import enhanceEventTarget from '../utils/enhanceEventTarget'

import { Div } from './tags'

type MenuItemProps = ElementProps<'div'> & {
  value?: any
  itemIndex?: number
  active?: boolean
  children?: ReactNode
}

const propTypes = {
  value: PropTypes.any,
  itemIndex: PropTypes.number,
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

function MenuItem({
  value,
  children,
  // active,
  itemIndex,
  ...props
}: MenuItemProps) {
  const [menuState, setMenuState] = useContext(MenuContext)

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
        if (typeof props.onClick === 'function') props.onClick(enhanceEventTarget<HTMLDivElement>(event, { value }))
      }}
      onMouseEnter={event => {
        if (menuState.activeItemIndex !== itemIndex) {
          setMenuState(x => ({
            ...x,
            activeItemIndex: itemIndex,
          }))
        }
        if (typeof props.onClick === 'function') props.onMouseEnter(event)
      }}
      onMouseMove={event => {
        if (menuState.activeItemIndex !== itemIndex) {
          setMenuState(x => ({
            ...x,
            activeItemIndex: itemIndex,
          }))
        }
        if (typeof props.onClick === 'function') props.onMouseEnter(event)
      }}
    >
      {children}
    </Div>
  )
}

MenuItem.propTypes = propTypes

export default withHonorable<MenuItemProps>(MenuItem, 'menuItem')
