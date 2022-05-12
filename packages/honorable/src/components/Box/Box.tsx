import { Ref, forwardRef } from 'react'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import { Div, DivProps } from '../tags'

export type BoxBaseProps = unknown

export type BoxProps = HonorableProps<DivProps & BoxBaseProps>

export const BoxPropTypes = {}

function BoxRef(props: BoxProps, ref: Ref<any>) {
  return (
    <Div
      ref={ref}
      {...props}
    />
  )
}

BoxRef.displayName = 'Box'

const ForwardedBox = forwardRef(BoxRef)

ForwardedBox.propTypes = BoxPropTypes

export const Box = withHonorable<BoxProps>(ForwardedBox, 'Box')
