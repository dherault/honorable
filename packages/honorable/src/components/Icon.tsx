import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import { Span } from './tags'

type IconProps = ElementProps<'span'>

const propTypes = {}

function Icon(props: IconProps) {
  return (
    <Span
      xflex="x5"
      display="inline-flex"
      {...props}
    />
  )
}

Icon.propTypes = propTypes

export default withHonorable<IconProps>(Icon, 'icon')
