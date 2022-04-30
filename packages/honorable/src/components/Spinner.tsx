import { Ref, forwardRef } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import { Span, SpanProps } from './tags'

export type SpinnerProps = SpanProps & {
  size?: number
  color?: string
}

export const spinnerPropTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SpinnerRef({ size, color, ...props }: SpinnerProps, ref: Ref<any>) {
  console.log('color', color)

  return (
    <Span
      ref={ref}
      {...props}
    />
  )
}

SpinnerRef.displayName = 'Spinner'

const ForwardedSpinner = forwardRef(SpinnerRef)

ForwardedSpinner.propTypes = spinnerPropTypes

export const Spinner = withHonorable<SpinnerProps>(ForwardedSpinner, 'Spinner')
