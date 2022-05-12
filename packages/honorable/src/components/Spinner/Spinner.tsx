import { Ref, forwardRef } from 'react'
import PropTypes from 'prop-types'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import { Span, SpanProps } from '../tags'

export type SpinnerBaseProps = {
  /**
   * The size of the Spinner
   */
  size?: number
  /**
   * The color of the Spinner
   */
  color?: string
}

export type SpinnerProps = HonorableProps<SpanProps & SpinnerBaseProps>

export const spinnerPropTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SpinnerRef({ size, color, ...props }: SpinnerProps, ref: Ref<any>) {
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
