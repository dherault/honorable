import { ChangeEvent, KeyboardEvent, MouseEvent, ReactNode, Ref, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import enhanceEventTarget from '../utils/enhanceEventTarget'
import useRegisterProps from '../hooks/useRegisterProps'

import { Span, SpanProps } from './tags'

export type CheckboxProps = SpanProps & {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  icon?: ReactNode
  onChange?: (event: MouseEvent | KeyboardEvent | ChangeEvent) => void
}

const propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  onChange: PropTypes.func,
}

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

function CheckboxRef({
  honorableId,
  defaultChecked,
  checked,
  disabled = false,
  icon = defaultIcon,
  onChange,
  ...props
}: CheckboxProps,
ref: Ref<any>
) {
  const [actualChecked, setActualChecked] = useState(checked || defaultChecked)

  // Override `checked` prop in customProps
  useRegisterProps('Checkbox', { checked: actualChecked }, honorableId)

  const style = {
    '&:hover': {
      border: `1px solid ${disabled ? 'border' : 'primary'}`,
    },
  }

  function handleChange(event: MouseEvent | KeyboardEvent) {
    if (typeof onChange === 'function') onChange(enhanceEventTarget(event, { checked: !actualChecked }))
    setActualChecked(!actualChecked)
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'Space') {
      handleChange(event)
    }
  }

  return (
    <Span
      ref={ref}
      xflex="x5"
      display="inline-flex"
      tabIndex={0}
      {...style}
      {...props}
      onClick={event => {
        if (disabled) return
        handleChange(event)
        if (typeof props.onClick === 'function') props.onClick(event)
      }}
      onKeyDown={event => {
        if (disabled) return
        handleKeyDown(event)
        if (typeof props.onKeyDown === 'function') props.onKeyDown(event)
      }}
    >
      {actualChecked && icon}
    </Span>
  )
}

CheckboxRef.displayName = 'Checkbox'

const ForwaredCheckbox = forwardRef(CheckboxRef)

ForwaredCheckbox.propTypes = propTypes

export const Checkbox = withHonorable<CheckboxProps>(ForwaredCheckbox, 'Checkbox')
