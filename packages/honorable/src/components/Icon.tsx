import { Ref, forwardRef } from 'react'

import withHonorable from '../withHonorable'

import { Span, SpanProps } from './tags'

export type IconProps = SpanProps

export const iconPropTypes = {}

function IconRef(props: IconProps, ref: Ref<any>) {
  return (
    <Span
      ref={ref}
      xflex="x5"
      display="inline-flex"
      {...props}
    />
  )
}

IconRef.displayName = 'Icon'

const ForwardedIcon = forwardRef(IconRef)

ForwardedIcon.propTypes = iconPropTypes

export const Icon = withHonorable<IconProps>(ForwardedIcon, 'Icon')
