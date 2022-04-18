import { ReactNode } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import { Span } from './tags'

type IconProps = typeof Span & {
  children: ReactNode
}

const propTypes = {
  children: PropTypes.node.isRequired,
}

function Icon(props: IconProps) {
  return (
    <Span
      xflex="x5"
      display="inline-flex"
      {...props}
    />
  )
}

Icon.propTypes = propTypes

export default withHonorable<IconProps>(Icon, 'icon')
