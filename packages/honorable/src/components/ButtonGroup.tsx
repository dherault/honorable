import { Ref, forwardRef } from 'react'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import { Div } from './tags'

type ButtonGroupProps = ElementProps<'div'>

const propTypes = {}

function ButtonGroup(props: ButtonGroupProps, ref: Ref<any>) {
  return (
    <Div
      ref={ref}
      display="inline-flex"
      xflex="x4"
      {...props}
    />
  )
}

const ForwardedButtonGroup = forwardRef(ButtonGroup)

ForwardedButtonGroup.propTypes = propTypes

export default withHonorable<ButtonGroupProps>(ForwardedButtonGroup, 'buttonGroup')
