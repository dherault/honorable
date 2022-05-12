import { Ref, forwardRef } from 'react'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import { Div, DivProps } from '../tags'

export type ButtonGroupBaseProps = unknown

export type ButtonGroupProps = HonorableProps<DivProps & ButtonGroupBaseProps>

export const buttonGroupPropTypes = {}

function ButtonGroupRef(props: ButtonGroupProps, ref: Ref<any>) {
  return (
    <Div
      ref={ref}
      display="inline-flex"
      alignItems="center"
      {...props}
    />
  )
}

ButtonGroupRef.displayName = 'ButtonGroup'

const ForwardedButtonGroup = forwardRef(ButtonGroupRef)

ForwardedButtonGroup.propTypes = buttonGroupPropTypes

export const ButtonGroup = withHonorable<ButtonGroupProps>(ForwardedButtonGroup, 'ButtonGroup')
