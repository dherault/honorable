import { ReactNode } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import useTheme from '../hooks/useTheme'
import resolvePartProps from '../utils/resolvePartProps'

import { ButtonBase, Span } from './tags'

type ButtonProps = ElementProps<'button'> & {
  startIcon?: ReactNode
  endIcon?: ReactNode
}

const propTypes = {
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
}

function Button(props: ButtonProps) {
  const { startIcon, endIcon, children, ...otherProps } = props
  const theme = useTheme()

  return (
    <ButtonBase
      xflex="x4"
      {...otherProps}
    >
      {!!startIcon && (
        <Span
          xflex="x5"
          extend={resolvePartProps('button', 'startIcon', props, theme)}
        >
          {startIcon}
        </Span>
      )}
      {children}
      {!!endIcon && (
        <Span
          xflex="x5"
          extend={resolvePartProps('button', 'endIcon', props, theme)}
        >
          {endIcon}
        </Span>
      )}
    </ButtonBase>
  )
}

Button.propTypes = propTypes

export default withHonorable<ButtonProps>(Button, 'button')
