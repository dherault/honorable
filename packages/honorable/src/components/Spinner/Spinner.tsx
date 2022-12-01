import { Ref, forwardRef } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps } from '../../types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import filterUndefinedValues from '../../utils/filterUndefinedValues'

import { Span } from '../tags'

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

export const Spinner = forwardRef(SpinnerRef)

Spinner.displayName = 'Spinner'
Spinner.propTypes = spinnerPropTypes
