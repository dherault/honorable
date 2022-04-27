import { ReactNode, Ref, forwardRef } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import useTheme from '../hooks/useTheme'
import resolvePartProps from '../utils/resolvePartProps'

import { ButtonBase, ButtonBaseProps, Span } from './tags'

export type ButtonProps = ButtonBaseProps & {
  startIcon?: ReactNode
  endIcon?: ReactNode
}

const propTypes = {
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  // ref: PropTypes.any,
}

function ButtonRef(props: ButtonProps, ref: Ref<any>) {
  const { startIcon, endIcon, children, ...otherProps } = props
  const theme = useTheme()

  return (
    <ButtonBase
      ref={ref}
      xflex="x4"
      {...otherProps}
    >
      {!!startIcon && (
        <Span
          xflex="x5"
          extend={resolvePartProps('Button', 'StartIcon', props, theme)}
        >
          {startIcon}
        </Span>
      )}
      {children}
      {!!endIcon && (
        <Span
          xflex="x5"
          extend={resolvePartProps('Button', 'EndIcon', props, theme)}
        >
          {endIcon}
        </Span>
      )}
    </ButtonBase>
  )
}

ButtonRef.displayName = 'Button'

const ForwardedButton = forwardRef(ButtonRef)

ForwardedButton.propTypes = propTypes

export const Button = withHonorable<ButtonProps>(ForwardedButton, 'Button')
