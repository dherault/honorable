import { Ref, forwardRef } from 'react'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import { Span, SpanProps } from '../tags'

export type IconBaseProps = unknown

export type IconProps = HonorableProps<SpanProps & IconBaseProps>

export const iconPropTypes = {}

function IconRef(props: IconProps, ref: Ref<any>) {
  return (
    <Span
      ref={ref}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    />
  )
}

IconRef.displayName = 'Icon'

const ForwardedIcon = forwardRef(IconRef)

ForwardedIcon.propTypes = iconPropTypes

export const Icon = withHonorable<IconProps>(ForwardedIcon, 'Icon')
