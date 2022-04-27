import { ChangeEvent, ReactNode, Ref, forwardRef, useCallback, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import usePartProps from '../hooks/usePartProps'
import useRegisterProps from '../hooks/useRegisterProps'

import { Div, DivProps, InputBase, TextareaProps } from './tags'

export type ValueType = (string | number | readonly string[]) & string

export type InputProps = DivProps & {
  type?: string
  value?: ValueType
  defaultValue?: ValueType
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  startIcon?: ReactNode
  endIcon?: ReactNode
  disabled?: boolean
  autoFocus?: boolean
  multiline?: boolean
  minRows?: number
  maxRows?: number
}

export type ExpandableTextareaProps = TextareaProps & {
  value?: string
  maxRows?: number
  honorableInputProps?: object
}

const propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  multiline: PropTypes.bool,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
}

function InputRef(props: InputProps, ref: Ref<any>) {
  const {
    honorableId,
    type,
    value,
    defaultValue,
    onChange,
    startIcon,
    endIcon,
    disabled,
    autoFocus,
    multiline,
    minRows,
    maxRows,
    ...otherProps
  } = props
  const [active, setActive] = useState(false)
  const [uncontrolledValue, setUncontrolledValue] = useState<ValueType>(defaultValue ?? '')
  const actualValue = value ?? uncontrolledValue

  useRegisterProps('Input', { active, value: actualValue }, honorableId)

  const extendInputBase = usePartProps('Input', 'InputBase', props)
  const extendStartIcon = usePartProps('Input', 'StartIcon', props)
  const extendEndIcon = usePartProps('Input', 'EndIcon', props)
  const extendTextArea = usePartProps('Input', 'TextArea', props)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUncontrolledValue(event.target.value)
    if (typeof onChange === 'function') onChange(event)
  }, [onChange])

  return (
    <Div
      ref={ref}
      xflex="x1"
      display="inline-flex"
      px={0.5}
      {...otherProps}
    >
      {!!startIcon && (
        <Div
          xflex="x5"
          extend={extendStartIcon}
        >
          {startIcon}
        </Div>
      )}
      {!multiline && (
        <InputBase
          type={type}
          autoFocus={autoFocus}
          disabled={disabled}
          value={actualValue}
          onChange={handleChange}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          extend={extendInputBase}
        />
      )}
      {multiline && (
        <TextareaAutosize
          autoFocus={autoFocus}
          disabled={disabled}
          value={actualValue}
          onChange={handleChange}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          minRows={minRows}
          maxRows={maxRows}
          style={extendTextArea}
        />
      )}
      {!!endIcon && (
        <Div
          xflex="x5"
          extend={extendEndIcon}
        >
          {endIcon}
        </Div>
      )}
    </Div>
  )
}

InputRef.displayName = 'Input'

const ForwardedInput = forwardRef(InputRef)

// There is a conflict between `title` of DivProps and this component
// @ts-ignore
ForwardedInput.propTypes = propTypes

export const Input = withHonorable<InputProps>(ForwardedInput, 'Input')
