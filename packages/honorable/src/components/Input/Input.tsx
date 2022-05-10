import { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode, Ref, forwardRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import PropTypes from 'prop-types'

import withHonorable from '../../withHonorable'

import useTheme from '../../hooks/useTheme'
import useOverridenProps from '../../hooks/useOverridenProps'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Div, DivProps, InputBase } from '../tags'

export type InputValueType = (string | number | readonly string[]) & string | number

export type InputBaseProps = {
  /**
   * The type of the Input
   */
  type?: string
  /**
   * The value of the Input
   */
  value?: InputValueType
  /**
   * The default value of the Input
   */
  defaultValue?: InputValueType
  /**
   * The placeholder of the Input
   */
  placeholder?: string
  /**
   * Callback function called when the Input value changes
   */
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  /**
   * Callback function called when the Input gains focus
   */
  onFocus?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  /**
   * Callback function called when the Input looses focus
   */
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  /**
   * Callback function called when the Input received a keydown event
   */
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  /**
   * Callback function called when the Input received a keyup event
   */
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  /**
   * The icon react node at the start of the Input
   */
  startIcon?: ReactNode
  /**
   * The icon react node at the end of the Input
   */
  endIcon?: ReactNode
  /**
   * Weither the Input is disabled or not
   */
  disabled?: boolean
  /**
   * Weither the Input should focus on mount or not
   */
  autoFocus?: boolean
  /**
   * Weither the Input is mutliline or not. If so, a <textarea> is rendered
   */
  multiline?: boolean
  /**
   * If multiline, the minimum number of rows to display
   */
  minRows?: number
  /**
   * If multiline, the maximum number of rows to display
   */
  maxRows?: number
}

// TODO v1 readOnly
export type InputProps = Omit<DivProps, 'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'onKeyUp'> & InputBaseProps

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
  const [uncontrolledValue, setUncontrolledValue] = useState<InputValueType>(defaultValue ?? '')
  const actualValue = value ?? uncontrolledValue

  useOverridenProps(props, { active, value: actualValue })

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUncontrolledValue(event.target.value)
    if (typeof onChange === 'function') onChange(event)
  }

  return (
    <Div
      ref={ref}
      display="inline-flex"
      alignItems="flex-start"
      justifyContent="flex-start"
      px={0.5}
      {...otherProps}
    >
      {!!startIcon && (
        <Div
          display="flex"
          alignItems="center"
          justifyContent="center"
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
          display="flex"
          alignItems="center"
          justifyContent="center"
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
