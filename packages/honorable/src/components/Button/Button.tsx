import { ReactNode, Ref, forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'
import useRootStyles from '../../hooks/useRootStyles'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Spinner } from '../Spinner/Spinner'
import { ButtonBase, ButtonBaseBaseProps, Span } from '../tags'

export type ButtonBaseProps = {
  /**
   * The icon at the left of the Button
   */
  startIcon?: ReactNode
  /**
   * The icon at the right of the Button
   */
  endIcon?: ReactNode
  /**
   * Weither the Button displays a loading state or not
   */
  loading?: boolean
  /**
   * The node to display during the loading state if the Button
   */
  loadingIndicator?: ReactNode
  /**
   * Weither the Button is disabled or not
   */
  disabled?: boolean
  /**
   * The Button's Spinner color
   */
  spinnerColor?: string
}

export type ButtonProps = ButtonBaseBaseProps & ButtonBaseProps

export const buttonPropTypes = {
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  loading: PropTypes.bool,
  loadingIndicator: PropTypes.node,
  disabled: PropTypes.bool,
  spinnerColor: PropTypes.string,
}

function ButtonRef(props: ButtonProps, ref: Ref<any>) {
  const {
    startIcon,
    endIcon,
    children,
    loading,
    loadingIndicator,
    spinnerColor = 'white',
    ...otherProps
  } = props
  const theme = useTheme()
  const buttonRef = useRef<HTMLButtonElement>()
  const forkedRef = useForkedRef(ref, buttonRef)
  const [height, setHeight] = useState<number | 'auto'>('auto')
  const rootStyles = useRootStyles('Button', props, theme)

  useEffect(() => {
    if (!buttonRef.current) return

    setHeight(buttonRef.current.offsetHeight)
  }, [])

  return (
    <ButtonBase
      ref={forkedRef}
      display="inline-flex"
      alignItems="center"
      disabled={loading}
      position="relative"
      {...rootStyles}
      {...otherProps}
    >
      {!!startIcon && (
        <Span
          display="flex"
          alignItems="center"
          justifyContent="center"
          visibility={loading ? 'hidden' : 'inherit'}
          {...resolvePartStyles('Button.StartIcon', props, theme)}
        >
          {startIcon}
        </Span>
      )}
      {loading && (
        <Span
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          {...resolvePartStyles('Button.LoadingIndicator', props, theme)}
        >
          {(loadingIndicator || (
            <Spinner
              color={spinnerColor}
              size={typeof height === 'number' ? height * 3 / 5 : 16}
              {...resolvePartStyles('Spinner', props, theme)}
            />
          ))}
        </Span>
      )}
      <Span
        display="flex"
        alignItems="center"
        justifyContent="center"
        visibility={loading ? 'hidden' : 'inherit'}
        {...resolvePartStyles('Button.Children', props, theme)}
      >
        {children}
      </Span>
      {!!endIcon && (
        <Span
          display="flex"
          alignItems="center"
          justifyContent="center"
          visibility={loading ? 'hidden' : 'inherit'}
          {...resolvePartStyles('Button.EndIcon', props, theme)}
        >
          {endIcon}
        </Span>
      )}
    </ButtonBase>
  )
}

export const Button = forwardRef(ButtonRef)

Button.displayName = 'Button'
Button.propTypes = buttonPropTypes
