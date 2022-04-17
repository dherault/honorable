import { ReactNode } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import { Div } from './tags'

type ButtonGroupProps = {
  children: ReactNode
}

const propTypes = {
  children: PropTypes.node.isRequired,
}

function ButtonGroup(props: ButtonGroupProps) {
  return (
    <Div
      display="inline-flex"
      border="1px solid primary"
      borderRadius={4}
      xflex="x4"
      {...props}
    />
  )
}

ButtonGroup.propTypes = propTypes

export default withHonorable<ButtonGroupProps>(ButtonGroup)
