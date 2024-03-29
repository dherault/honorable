import { ChangeEvent, KeyboardEvent, MouseEvent, ReactNode, Ref, forwardRef, memo, useState } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps, CssProps, TargetWithChecked, TargetWithValue } from '../../types.js'

import useTheme from '../../hooks/useTheme.js'
import useRootStyles from '../../hooks/useRootStyles.js'

import resolvePartStyles from '../../resolvers/resolvePartStyles.js'

import enhanceEventTarget from '../../utils/enhanceEventTarget.js'
import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import { Div, Span } from '../tags.js'

export const radioParts = ['Control', 'Children'] as const

export type RadioBaseProps = {
  /**
   * The value of the Radio, available at event.target.value, passed to RadioGroup if any
   */
  value?: any
  /**
   * Weither the Radio is checked dor not
   */
  checked?: boolean
  /**
   * Weither the Radio is checked or not by default
   */
  defaultChecked?: boolean
  /**
   * Weither thhe Radio is disabled or not
   */
  disabled?: boolean
  /**
   * The icon used for the unchecked state
   */
  iconUnchecked?: ReactNode
  /**
   * The icon used to the checked state
   */
  iconChecked?: ReactNode
  /**
   * Callback called when the Radio is clicked
   */
  onChange?: (event: TargetWithChecked<TargetWithValue<MouseEvent | KeyboardEvent | ChangeEvent>>) => void
  /**
   * The position of the label relative to the control
   */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom'
}

export type RadioProps = ComponentProps<RadioBaseProps, 'div', typeof radioParts[number]>

export const radioPropTypes = {
  value: PropTypes.any,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  iconChecked: PropTypes.node,
  iconUnchecked: PropTypes.node,
  onChange: PropTypes.func,
  labelPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
}

const defaultIconUnchecked = (
  <svg
    width="100%"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.877075 7.49991C0.877075 3.84222 3.84222 0.877075 7.49991 0.877075C11.1576 0.877075 14.1227 3.84222 14.1227 7.49991C14.1227 11.1576 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1576 0.877075 7.49991ZM7.49991 1.82708C4.36689 1.82708 1.82708 4.36689 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49991C13.1727 4.36689 10.6329 1.82708 7.49991 1.82708Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

const defaultIconChecked = (
  <svg
    width="100%"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.49985 0.877045C3.84216 0.877045 0.877014 3.84219 0.877014 7.49988C0.877014 11.1575 3.84216 14.1227 7.49985 14.1227C11.1575 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1575 0.877045 7.49985 0.877045ZM1.82701 7.49988C1.82701 4.36686 4.36683 1.82704 7.49985 1.82704C10.6328 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6328 13.1727 7.49985 13.1727C4.36683 13.1727 1.82701 10.6329 1.82701 7.49988ZM7.49999 9.49999C8.60456 9.49999 9.49999 8.60456 9.49999 7.49999C9.49999 6.39542 8.60456 5.49999 7.49999 5.49999C6.39542 5.49999 5.49999 6.39542 5.49999 7.49999C5.49999 8.60456 6.39542 9.49999 7.49999 9.49999Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <circle
      cx="7.5"
      cy="7.5"
      r="3"
      fill="currentColor"
    />
  </svg>
)

function RadioRef(props: RadioProps, ref: Ref<any>) {
  const {
    value,
    defaultChecked,
    checked,
    disabled = false,
    iconUnchecked = defaultIconUnchecked,
    iconChecked = defaultIconChecked,
    onChange,
    children,
    labelPosition = 'right',
    ...otherProps
  } = props
  const theme = useTheme()
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked)
  const actualChecked = checked ?? uncontrolledChecked ?? false
  const workingProps = {
    ...props,
    checked: actualChecked,
    disabled,
    iconChecked,
    iconUnchecked,
    labelPosition,
  }
  const rootStyles = useRootStyles('Radio', workingProps, theme)

  const flexProps: CssProps = labelPosition === 'left'
    ? { justifyContent: 'flex-start', flexDirection: 'row-reverse' }
    : labelPosition === 'top'
      ? { justifyContent: 'flex-end', flexDirection: 'column-reverse' }
      : labelPosition === 'bottom'
        ? { justifyContent: 'flex-start', flexDirection: 'column' }
        : { justifyContent: 'flex-start' }

  function handleChange(event: MouseEvent | KeyboardEvent) {
    if (disabled) return
    if (typeof onChange === 'function') onChange(enhanceEventTarget(event, { checked: !actualChecked, value }))
    setUncontrolledChecked(!actualChecked)
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (disabled) return
    if (event.code === 'Enter' || event.code === 'Space') {
      handleChange(event)
    }
  }

  return (
    <Div
      ref={ref}
      tabIndex={0}
      display="flex"
      alignItems="center"
      cursor="pointer"
      userSelect="none"
      {...flexProps}
      {...rootStyles}
      {...filterUndefinedValues(otherProps)}
      onClick={event => {
        handleChange(event)
        if (typeof props.onClick === 'function') props.onClick(event)
      }}
      onKeyDown={event => {
        handleKeyDown(event)
        if (typeof props.onKeyDown === 'function') props.onKeyDown(event)
      }}
    >
      <Span
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        {...resolvePartStyles('Radio.Control', workingProps, theme)}
      >
        {actualChecked ? iconChecked : iconUnchecked}
      </Span>
      {!!children && (
        <Div {...resolvePartStyles('Radio.Children', workingProps, theme)}>
          {children}
        </Div>
      )}
    </Div>
  )
}

const BaseRadio = forwardRef(RadioRef)

BaseRadio.displayName = 'Radio'
BaseRadio.propTypes = radioPropTypes

export const Radio = memo(BaseRadio)
