import { ChangeEvent, KeyboardEvent, MouseEvent, ReactNode, Ref, forwardRef, memo, useState } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps, CssProps, TargetWithChecked } from '../../types.js'

import useTheme from '../../hooks/useTheme.js'
import useRootStyles from '../../hooks/useRootStyles.js'

import resolvePartStyles from '../../resolvers/resolvePartStyles.js'

import enhanceEventTarget from '../../utils/enhanceEventTarget.js'
import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import { Div, Span } from '../tags.js'

export const checkboxParts = ['Control', 'Children'] as const

export const checkboxPropTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  onChange: PropTypes.func,
  labelPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
}

export type CheckboxBaseProps = {
  /**
   * Weither the Checkbox is checked or not
   */
  checked?: boolean
  /**
   * Weither the Checkbox is checked by default or not
   */
  defaultChecked?: boolean
  /**
   * Weither the Checkbox is disabled or not
   */
  disabled?: boolean
  /**
   * The icon react node of the Checkbox
   */
  icon?: ReactNode
  /**
   * Callback function called when the Checkbox checked state changes
   */
  onChange?: (event: TargetWithChecked<MouseEvent | KeyboardEvent | ChangeEvent>) => void
  /**
   * The position of the label relative to the Checkbox
   */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom' | string
}

export type CheckboxProps = ComponentProps<CheckboxBaseProps, 'div', typeof checkboxParts[number]>

const defaultIcon = (
  <svg
    width="100%"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

// TODO v1 indeterminate prop
function CheckboxRef(props: CheckboxProps, ref: Ref<any>) {
  const {
    defaultChecked,
    checked,
    disabled = false,
    icon = defaultIcon,
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
    icon,
    labelPosition,
  }
  const rootStyles = useRootStyles('Checkbox', workingProps, theme)

  const flexProps: CssProps = labelPosition === 'left'
    ? { justifyContent: 'flex-start', flexDirection: 'row-reverse' }
    : labelPosition === 'top'
      ? { justifyContent: 'flex-end', flexDirection: 'column-reverse' }
      : labelPosition === 'bottom'
        ? { justifyContent: 'flex-start', flexDirection: 'column' }
        : { justifyContent: 'flex-start' }

  function handleChange(event: MouseEvent | KeyboardEvent) {
    if (disabled) return
    if (typeof onChange === 'function') onChange(enhanceEventTarget(event, { checked: !actualChecked }))
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
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        {...resolvePartStyles('Checkbox.Control', workingProps, theme)}
      >
        {actualChecked && icon}
      </Span>
      {!!children && (
        <Div {...resolvePartStyles('Checkbox.Children', workingProps, theme)}>
          {children}
        </Div>
      )}
    </Div>
  )
}

const BaseCheckbox = forwardRef(CheckboxRef)

BaseCheckbox.displayName = 'Checkbox'
BaseCheckbox.propTypes = checkboxPropTypes

export const Checkbox = memo(BaseCheckbox)
