import { Ref, forwardRef, memo } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps } from '../../types.js'

import useTheme from '../../hooks/useTheme.js'
import useRootStyles from '../../hooks/useRootStyles.js'

import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import { Span } from '../tags.js'

export const spinnerParts: readonly string[] = [] as const

export const spinnerPropTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}

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

export type SpinnerProps = ComponentProps<SpinnerBaseProps, 'div', typeof spinnerParts[number]>

function SpinnerRef({ size, color, ...props }: SpinnerProps, ref: Ref<any>) {
  const theme = useTheme()
  const rootStyles = useRootStyles('Spinner', { size, color, ...props }, theme)

  return (
    <Span
      ref={ref}
      {...rootStyles}
      {...filterUndefinedValues(props)}
    />
  )
}

const BaseSpinner = forwardRef(SpinnerRef)

BaseSpinner.displayName = 'Spinner'
BaseSpinner.propTypes = spinnerPropTypes

export const Spinner = memo(BaseSpinner)
