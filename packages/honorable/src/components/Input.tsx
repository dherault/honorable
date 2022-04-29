import { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode, Ref, forwardRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import usePartProps from '../hooks/usePartProps'
import useRegisterProps from '../hooks/useRegisterProps'

import { Div, DivProps, InputBase } from './tags'

export type ValueType = (string | number | readonly string[]) & string | number

// TODO v1 readOnly
export type InputProps = Omit<DivProps, 'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'onKeyUp'> & {
  type?: string
  value?: ValueType
  defaultValue?: ValueType
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onFocus?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  startIcon?: ReactNode
  endIcon?: ReactNode
  disabled?: boolean
  autoFocus?: boolean
  multiline?: boolean
  minRows?: number
  maxRows?: number
}

export const inputPropTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
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
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
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

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUncontrolledValue(event.target.value)
    if (typeof onChange === 'function') onChange(event)
  }

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
          onFocus={event => {
            setActive(true)
            if (typeof onFocus === 'function') onFocus(event)
          }}
          onBlur={event => {
            setActive(false)
            if (typeof onBlur === 'function') onBlur(event)
          }}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          extend={extendInputBase}
          flexGrow={1}
        />
      )}
      {multiline && (
        <TextareaAutosize
          autoFocus={autoFocus}
          disabled={disabled}
          value={actualValue}
          onChange={handleChange}
          onFocus={event => {
            setActive(true)
            if (typeof onFocus === 'function') onFocus(event)
          }}
          onBlur={event => {
            setActive(false)
            if (typeof onBlur === 'function') onBlur(event)
          }}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          minRows={minRows}
          maxRows={maxRows}
          style={{
            flexGrow: 1,
            ...extendTextArea,
          }}
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

ForwardedInput.propTypes = inputPropTypes

export const Input = withHonorable<InputProps>(ForwardedInput, 'Input')
