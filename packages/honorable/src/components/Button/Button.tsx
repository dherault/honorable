import { ReactNode, Ref, forwardRef, memo, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps } from '../../types.js'

import useTheme from '../../hooks/useTheme.js'
import useForkedRef from '../../hooks/useForkedRef.js'
import useRootStyles from '../../hooks/useRootStyles.js'

import resolvePartStyles from '../../resolvers/resolvePartStyles.js'

import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import { Spinner } from '../Spinner/Spinner.js'
import { ButtonBase, Span } from '../tags.js'

export const buttonParts = ['StartIcon', 'LoadingIndicator', 'Spinner', 'Children', 'EndIcon'] as const

export const buttonPropTypes = {
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  loading: PropTypes.bool,
  loadingIndicator: PropTypes.node,
  disabled: PropTypes.bool,
}

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
}

export type ButtonProps = ComponentProps<ButtonBaseProps, 'button', typeof buttonParts[number]>

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
      {...filterUndefinedValues(otherProps)}
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
              color="white"
              size={typeof height === 'number' ? height * 3 / 5 : 16}
              {...resolvePartStyles('Button.Spinner', props, theme)}
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

const BaseButton = forwardRef(ButtonRef)

BaseButton.displayName = 'Button'
BaseButton.propTypes = buttonPropTypes

export const Button = memo(BaseButton)
