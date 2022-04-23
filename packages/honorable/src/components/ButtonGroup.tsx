import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import { Div } from './tags'

type ButtonGroupProps = ElementProps<'div'>

const propTypes = {}

function ButtonGroup(props: ButtonGroupProps) {
  return (
    <Div
      display="inline-flex"
      xflex="x4"
      {...props}
    />
  )
}

ButtonGroup.propTypes = propTypes

export default withHonorable<ButtonGroupProps>(ButtonGroup, 'buttonGroup')
