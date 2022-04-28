import { Ref, forwardRef } from 'react'

import withHonorable from '../withHonorable'

import { Div, DivProps } from './tags'

export type ButtonGroupProps = DivProps

export const buttonGroupPropTypes = {}

function ButtonGroupRef(props: ButtonGroupProps, ref: Ref<any>) {
  return (
    <Div
      ref={ref}
      display="inline-flex"
      xflex="x4"
      {...props}
    />
  )
}

ButtonGroupRef.displayName = 'ButtonGroup'

const ForwardedButtonGroup = forwardRef(ButtonGroupRef)

ForwardedButtonGroup.propTypes = buttonGroupPropTypes

export const ButtonGroup = withHonorable<ButtonGroupProps>(ForwardedButtonGroup, 'ButtonGroup')
