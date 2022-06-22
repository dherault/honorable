import { Ref, forwardRef } from 'react'
import PropTypes from 'prop-types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

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

export type SpinnerProps = SpanProps & SpinnerBaseProps

export const spinnerPropTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}

function SpinnerRef({ size, color, ...props }: SpinnerProps, ref: Ref<any>) {
  const theme = useTheme()
  const rootStyles = useRootStyles('Spinner', { size, color, ...props }, theme)

  return (
    <Span
      ref={ref}
      {...rootStyles}
      {...props}
    />
  )
}

export const Spinner = forwardRef(SpinnerRef)

Spinner.displayName = 'Spinner'
Spinner.propTypes = spinnerPropTypes
