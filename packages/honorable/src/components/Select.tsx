import { MouseEvent, ReactNode, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import { MenuValueType } from '../contexts/MenuContext'
import enhanceEventTarget from '../utils/enhanceEventTarget'

import withHonorable from '../withHonorable'

import { Div } from './tags'
import Menu from './Menu'

type SelectProps = ElementProps<'div'> & {
  children: ReactNode
  value?: any
  onChange?: (event: MouseEvent) => void
}

const propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
}

function Select({ children, onChange, value, ...props }: SelectProps) {
  const [opened, setOpened] = useState(false)
  const [selected, setSelected] = useState<MenuValueType>([value, undefined, undefined])

  useEffect(() => {
    if (selected[2] && selected[0] !== value) {
      onChange(enhanceEventTarget(selected[2], { value: selected[0] }))
    }
  }, [selected, value, onChange])

  return (
    <Div
      {...props}
    >
      <Menu
        selected={selected}
        setSelected={setSelected}
      >
        {children}
      </Menu>
    </Div>
  )
}

Select.propTypes = propTypes

export default withHonorable<SelectProps>(Select, 'select')
