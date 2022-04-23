import { MouseEvent, ReactNode, useState } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import enhanceEventTarget from '../utils/enhanceEventTarget'
import withHonorable from '../withHonorable'

import { Span } from './tags'

type CheckboxProps = ElementProps<'span'> & {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  icon?: ReactNode
  onChange?: (event: MouseEvent) => void
  onClick?: (event: MouseEvent) => void
}

const propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
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

function Checkbox({
  defaultChecked,
  checked,
  disabled = false,
  icon = defaultIcon,
  onChange,
  onClick,
  ...props
}: CheckboxProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked)
  const actualChecked = typeof checked === 'boolean' ? checked : uncontrolledChecked

  const style = {
    '&:hover': {
      border: `1px solid ${disabled ? 'border' : 'primary'}`,
    },
  }

  return (
    <Span
      xflex="x5"
      display="inline-flex"
      color="white"
      backgroundColor={actualChecked ? disabled ? 'border' : 'primary' : 'transparent'}
      borderStyle="solid"
      borderWidth={1}
      borderRadius={2}
      borderColor={actualChecked && !disabled ? 'primary' : 'border'}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      width={24}
      height={24}
      userSelect="none"
      {...style}
      {...props}
      onClick={event => {
        if (typeof onClick === 'function') onClick(event)
        if (disabled) return
        if (typeof onChange === 'function') onChange(enhanceEventTarget(event, { checked: !actualChecked }))
        setUncontrolledChecked(!actualChecked)
      }}
    >
      {actualChecked && icon}
    </Span>
  )
}

Checkbox.propTypes = propTypes

export default withHonorable<CheckboxProps>(Checkbox, 'checkbox')
