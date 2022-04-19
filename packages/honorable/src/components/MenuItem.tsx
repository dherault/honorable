import { MouseEvent, ReactNode, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import MenuContext from '../contexts/MenuContext'
import enhanceEventTarget from '../utils/enhanceEventTarget'

import { Div } from './tags'

type MenuItemProps = ElementProps<'div'> & {
  value?: any
  onClick?: (event: MouseEvent) => void
  children?: ReactNode
}

const propTypes = {
  value: PropTypes.any,
  onClick: PropTypes.func,
}

function MenuItem({ value, onClick, children, ...props }: MenuItemProps) {
  const [menuSelected, setMenuSelected] = useContext(MenuContext)

  useEffect(() => {
    if (menuSelected && menuSelected[0] === value && !menuSelected[1]) {
      setMenuSelected([value, children, null])
    }
  }, [menuSelected, setMenuSelected, value, children])

  return (
    <Div
      cursor="pointer"
      userSelect="none"
      {...props}
      onClick={event => {
        console.log('value', value)
        setMenuSelected([value, children, event])

        if (typeof onClick === 'function') onClick(enhanceEventTarget(event, { value }))
      }}
    >
      {children}
    </Div>
  )
}

MenuItem.propTypes = propTypes

export default withHonorable<MenuItemProps>(MenuItem, 'menuItem')
