import { ReactNode, Ref, forwardRef } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import usePartProps from '../hooks/usePartProps'

import { ButtonBase, ButtonBaseProps, Span } from './tags'

export type ButtonProps = ButtonBaseProps & {
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export const buttonPropTypes = {
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
}

function ButtonRef(props: ButtonProps, ref: Ref<any>) {
  const { startIcon, endIcon, children, ...otherProps } = props

  const extendStartIcon = usePartProps('Button', 'StartIcon', props)
  const extendEndIcon = usePartProps('Button', 'EndIcon', props)

  return (
    <ButtonBase
      ref={ref}
      xflex="x4"
      {...otherProps}
    >
      {!!startIcon && (
        <Span
          xflex="x5"
          extend={extendStartIcon}
        >
          {startIcon}
        </Span>
      )}
      {children}
      {!!endIcon && (
        <Span
          xflex="x5"
          extend={extendEndIcon}
        >
          {endIcon}
        </Span>
      )}
    </ButtonBase>
  )
}

ButtonRef.displayName = 'Button'

const ForwardedButton = forwardRef(ButtonRef)

ForwardedButton.propTypes = buttonPropTypes

export const Button = withHonorable<ButtonProps>(ForwardedButton, 'Button')
