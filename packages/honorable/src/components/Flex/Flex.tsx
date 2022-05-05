import { Ref, forwardRef } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../../withHonorable'

import { Div, DivProps } from '../tags'

export type FlexProps = DivProps & {
  direction?: string
  wrap?: string
  basis?: string
  grow?: number
  shrink?: number
  align?: string
  justify?: string
}

export const FlexPropTypes = {
  direction: PropTypes.string,
  wrap: PropTypes.string,
  basis: PropTypes.string,
  grow: PropTypes.number,
  shrink: PropTypes.number,
  align: PropTypes.string,
  justify: PropTypes.string,
}

function FlexRef(props: FlexProps, ref: Ref<any>) {
  const {
    direction,
    wrap,
    basis,
    grow,
    shrink,
    align,
    justify,
  } = props

  return (
    <Div
      ref={ref}
      display="flex"
      flexDirection={direction}
      flexWrap={wrap}
      flexBasis={basis}
      flexGrow={grow}
      flexShrink={shrink}
      alignItems={align}
      justifyContent={justify}
      {...props}
    />
  )
}

FlexRef.displayName = 'Flex'

const ForwardedFlex = forwardRef(FlexRef)

ForwardedFlex.propTypes = FlexPropTypes

export const Flex = withHonorable<FlexProps>(ForwardedFlex, 'Flex')
