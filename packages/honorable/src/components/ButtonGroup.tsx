import { ReactNode } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import { Div } from './tags'

type ButtonGroupProps = typeof Div & {
  children: ReactNode
}

const propTypes = {
  children: PropTypes.node.isRequired,
}

function ButtonGroup(props: ButtonGroupProps) {
  return (
    <Div
      display="inline-flex"
      xflex="x4"
      {...props}
    />
  )
}

ButtonGroup.propTypes = propTypes

export default withHonorable<ButtonGroupProps>(ButtonGroup, 'buttonGroup')
