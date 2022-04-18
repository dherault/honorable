import { ReactNode, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import MenuContext, { MenuContextType, MenuValueType } from '../contexts/MenuContext'

import { Div } from './tags'

type MenuProps = {
  children: ReactNode
  selected?: MenuValueType
  setSelected?: (value: MenuValueType) => void
}

const propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.arrayOf(PropTypes.any),
  setSelected: PropTypes.func,
}

function Menu({ selected, setSelected, ...props }: MenuProps) {
  const [actualSelected, setActualSelected] = useState<MenuValueType>(selected || [undefined, undefined, undefined])
  const menuValue = useMemo<MenuContextType>(() => [actualSelected, setActualSelected], [actualSelected, setActualSelected])

  useEffect(() => {
    if (typeof setSelected === 'function' && selected[0] !== actualSelected[0]) setSelected(actualSelected)
  }, [setSelected, actualSelected, selected])

  return (
    <MenuContext.Provider value={menuValue}>
      <Div
        display="inline-block"
        {...props}
      />
    </MenuContext.Provider>
  )
}

Menu.propTypes = propTypes

export default withHonorable<MenuProps>(Menu)
