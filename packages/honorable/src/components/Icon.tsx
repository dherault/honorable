import { InferProps } from 'prop-types'

import withHonorable from '../withHonorable'

import { Span } from './tags'

function Icon(props: InferProps<typeof Icon.propTypes>) {
  return (
    <Span
      xflex="x5"
      display="inline-flex"
      {...props}
    />
  )
}

Icon.propTypes = Span.propTypes

export default withHonorable(Icon, 'icon')
