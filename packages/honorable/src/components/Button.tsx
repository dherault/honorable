import { ReactNode, Ref, forwardRef } from 'react'
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
  // ref: PropTypes.any,
}

function Button(props: ButtonProps, ref: Ref<any>) {
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

const ForwardedButton = forwardRef(Button)

ForwardedButton.propTypes = propTypes

export default withHonorable<ButtonProps>(ForwardedButton, 'button')
