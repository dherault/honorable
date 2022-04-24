import { Ref, forwardRef } from 'react'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import { Span } from './tags'

type IconProps = ElementProps<'span'>

const propTypes = {}

function Icon(props: IconProps, ref: Ref<any>) {
  return (
    <Span
      ref={ref}
      xflex="x5"
      display="inline-flex"
      {...props}
    />
  )
}

const ForwardedIcon = forwardRef(Icon)

ForwardedIcon.propTypes = propTypes

export default withHonorable<IconProps>(ForwardedIcon, 'icon')
