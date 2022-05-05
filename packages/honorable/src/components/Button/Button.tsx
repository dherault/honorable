import { ReactNode, Ref, forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../../withHonorable'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'

import resolvePartProps from '../../resolvers/resolvePartProps'

import { Spinner } from '../Spinner/Spinner'
import { ButtonBase, ButtonBaseProps, Span } from '../tags'

export type ButtonProps = ButtonBaseProps & {
  startIcon?: ReactNode
  endIcon?: ReactNode
  loading?: boolean
  loadingIndicator?: ReactNode
  disabled?: boolean
}

export const buttonPropTypes = {
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  loading: PropTypes.bool,
  loadingIndicator: PropTypes.node,
  disabled: PropTypes.bool,
}

// TODO v1 loading
function ButtonRef(props: ButtonProps, ref: Ref<any>) {
  const {
    startIcon,
    endIcon,
    children,
    loading,
    loadingIndicator,
    ...otherProps
  } = props
  const theme = useTheme()
  const buttonRef = useRef<HTMLButtonElement>()
  const forkedRef = useForkedRef(ref, buttonRef)
  const [height, setHeight] = useState<number | 'auto'>('auto')

  useEffect(() => {
    if (!buttonRef.current) return

    setHeight(buttonRef.current.offsetHeight)
  }, [])

  return (
    <ButtonBase
      ref={forkedRef}
      xflex="x4"
      {...otherProps}
      position="relative"
      disabled={props.disabled || loading}
    >
      {!!startIcon && (
        <Span
          xflex="x5"
          visibility={loading ? 'hidden' : 'visible'}
          {...resolvePartProps('StartIcon', props, theme)}
        >
          {startIcon}
        </Span>
      )}
      {loading && (
        <Span
          xflex="x5"
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          {...resolvePartProps('LoadingIndicator', props, theme)}
        >
          {(loadingIndicator || (
            <Spinner
              size={typeof height === 'number' ? height * 3 / 5 : 16}
              {...resolvePartProps('Spinner', props, theme)}
            />
          ))}
        </Span>
      )}
      <Span
        visibility={loading ? 'hidden' : 'visible'}
        {...resolvePartProps('Children', props, theme)}
      >
        {children}
      </Span>
      {!!endIcon && (
        <Span
          xflex="x5"
          visibility={loading ? 'hidden' : 'visible'}
          {...resolvePartProps('EndIcon', props, theme)}
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
