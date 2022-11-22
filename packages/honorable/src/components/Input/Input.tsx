import { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode, Ref, forwardRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import PropTypes from 'prop-types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Div, DivProps, InputBase } from '../tags'

export type InputValueType = (string | number | readonly string[]) & string | number

// TODO v1 readOnly
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
   * Callback function called when the Input received a "Enter" keydown event
   */
  onEnter?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
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
  /**
   * The props for the input component
   */
  inputProps?: any
}

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
  onEnter: PropTypes.func,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  multiline: PropTypes.bool,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  inputProps: PropTypes.object,
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
    onEnter,
    startIcon,
    endIcon,
    disabled,
    autoFocus,
    multiline,
    minRows,
    maxRows,
    inputProps = {},
    ...otherProps
  } = props
  const theme = useTheme()
  const [uncontrolledValue, setUncontrolledValue] = useState<InputValueType>(defaultValue ?? '')
  const actualValue = value ?? uncontrolledValue
  const workingProps = { ...props, value: actualValue }
  const rootStyles = useRootStyles('Input', workingProps, theme)

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUncontrolledValue(event.target.value)
    if (typeof onChange === 'function') onChange(event)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (event.key === 'Enter' && typeof onEnter === 'function') onEnter(event)
  }

  return (
    <Div
      ref={ref}
      display="inline-flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      {...rootStyles}
      {...otherProps}
    >
      {!!startIcon && (
        <Div
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          {...resolvePartStyles('Input.StartIcon', workingProps, theme)}
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
          flexGrow={1}
          flexShrink={1}
          minWidth={0} // https://stackoverflow.com/questions/42421361/input-button-elements-not-shrinking-in-a-flex-container
          onFocus={event => {
            if (typeof onFocus === 'function') onFocus(event)
          }}
          onBlur={event => {
            if (typeof onBlur === 'function') onBlur(event)
          }}
          onKeyDown={event => {
            handleKeyDown(event)
            if (typeof onKeyDown === 'function') onKeyDown(event)
          }}
          onKeyUp={onKeyUp}
          {...resolvePartStyles('Input.InputBase', workingProps, theme)}
          {...inputProps}
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
            if (typeof onFocus === 'function') onFocus(event)
          }}
          onBlur={event => {
            if (typeof onBlur === 'function') onBlur(event)
          }}
          onKeyDown={event => {
            handleKeyDown(event)
            if (typeof onKeyDown === 'function') onKeyDown(event)
          }}
          onKeyUp={onKeyUp}
          minRows={minRows}
          maxRows={maxRows}
          style={{
            flexGrow: 1,
            flexShrink: 1,
            minWidth: 0,
            ...resolvePartStyles('Input.TextArea', workingProps, theme),
          }}
          {...inputProps}
        />
      )}
      {!!endIcon && (
        <Div
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          {...resolvePartStyles('Input.EndIcon', workingProps, theme)}
        >
          {endIcon}
        </Div>
      )}
    </Div>
  )
}

export const Input = forwardRef(InputRef)

Input.displayName = 'Input'
Input.propTypes = inputPropTypes
