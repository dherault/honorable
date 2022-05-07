import { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode, Ref, forwardRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import PropTypes from 'prop-types'

import withHonorable from '../../withHonorable'

import useTheme from '../../hooks/useTheme'
import useOverridenProps from '../../hooks/useOverridenProps'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Div, DivProps, InputBase } from '../tags'

export type ValueType = (string | number | readonly string[]) & string | number

// TODO v1 readOnly
// TODO v1 generate props based on type
export type InputProps = Omit<DivProps, 'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'onKeyUp'> & {
  type?: string
  value?: ValueType
  defaultValue?: ValueType
  placeholder?: string
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
  placeholder: PropTypes.string,
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
    type,
    value,
    defaultValue,
    placeholder,
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
  const theme = useTheme()
  const [active, setActive] = useState(false)
  const [uncontrolledValue, setUncontrolledValue] = useState<ValueType>(defaultValue ?? '')
  const actualValue = value ?? uncontrolledValue

  useOverridenProps(props, { active, value: actualValue })

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
          {...resolvePartStyles('StartIcon', props, theme)}
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
          placeholder={placeholder}
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
          {...resolvePartStyles('InputBase', props, theme)}
          flexGrow={1}
        />
      )}
      {multiline && (
        <TextareaAutosize
          autoFocus={autoFocus}
          disabled={disabled}
          value={actualValue}
          onChange={handleChange}
          placeholder={placeholder}
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
            ...resolvePartStyles('TextArea', props, theme),
          }}
        />
      )}
      {!!endIcon && (
        <Div
          xflex="x5"
          {...resolvePartStyles('EndIcon', props, theme)}
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
