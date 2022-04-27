import { Ref, forwardRef } from 'react'

import withHonorable from '../withHonorable'

import { Div, DivProps } from './tags'

type ButtonGroupProps = DivProps

const propTypes = {}

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

ForwardedButtonGroup.propTypes = propTypes

export const ButtonGroup = withHonorable<ButtonGroupProps>(ForwardedButtonGroup, 'ButtonGroup')
