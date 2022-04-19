import { ReactNode, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import MenuContext, { MenuContextType, MenuValueDispatcherType, MenuValueType } from '../contexts/MenuContext'
import usePrevious from '../hooks/usePrevious'

import { Div } from './tags'

type MenuProps = ElementProps<'div'> & {
  children: ReactNode
  selected?: MenuValueType
  setSelected?: MenuValueDispatcherType
  setUpdated?: () => unknown
}

const propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.arrayOf(PropTypes.any),
  setSelected: PropTypes.func,
  setUpdated: PropTypes.func,
}

function Menu({ selected, setSelected, setUpdated, ...props }: MenuProps) {
  const [actualSelected, setActualSelected] = useState<MenuValueType>(selected || [undefined, undefined, undefined])
  const menuValue = useMemo<MenuContextType>(() => [actualSelected, setActualSelected], [actualSelected, setActualSelected])
  const previousActualSelected = usePrevious(actualSelected) || actualSelected

  useEffect(() => {
    if (typeof setSelected === 'function' && (selected[0] !== actualSelected[0] || selected[1] !== actualSelected[1])) {
      setSelected(actualSelected)
    }
  }, [setSelected, actualSelected, selected])

  useEffect(() => {
    if (typeof setUpdated === 'function' && actualSelected !== previousActualSelected) {
      setUpdated()
    }
  }, [setUpdated, actualSelected, previousActualSelected])

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

export default withHonorable<MenuProps>(Menu, 'menu')
