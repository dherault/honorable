import { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode, Ref, forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import PropTypes from 'prop-types'

import { ComponentProps } from '../../types.js'

import useTheme from '../../hooks/useTheme.js'
import useRootStyles from '../../hooks/useRootStyles.js'
import useForkedRef from '../../hooks/useForkedRef.js'

import resolvePartStyles from '../../resolvers/resolvePartStyles.js'

import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import { Div, InputBase } from '../tags.js'

export const inputParts = ['StartIcon', 'InputBase', 'TextArea', 'EndIcon'] as const

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
  autoSelect: PropTypes.bool,
  multiline: PropTypes.bool,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  inputProps: PropTypes.object,
}

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
   * Weither the Input text should be selected on mount or not. autoFocus must be true for this to work
   */
  autoSelect?: boolean
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

export type InputProps = ComponentProps<InputBaseProps, 'div', typeof inputParts[number]>

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
    autoSelect,
    multiline,
    minRows,
    maxRows,
    inputProps = {},
    ...otherProps
  } = props as InputBaseProps
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const forkedRef = useForkedRef(inputRef, inputProps.ref)
  const [uncontrolledValue, setUncontrolledValue] = useState<InputValueType>(defaultValue ?? '')
  const actualValue = value ?? uncontrolledValue
  const workingProps = { ...props, value: actualValue }
  const rootStyles = useRootStyles('Input', workingProps, theme)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUncontrolledValue(event.target.value)
    if (typeof onChange === 'function') onChange(event)
  }, [onChange])

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && typeof onEnter === 'function') onEnter(event)
    if (typeof onKeyDown === 'function') onKeyDown(event)
  }, [onEnter, onKeyDown])

  useEffect(() => {
    if (!(inputRef.current && autoFocus && autoSelect)) return

    inputRef.current.select()
  }, [autoFocus, autoSelect])

  return (
    <Div
      ref={ref}
      display="inline-flex"
      justifyContent="flex-start"
      alignItems="stretch"
      {...rootStyles}
      {...filterUndefinedValues(otherProps)}
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
          ref={forkedRef}
          type={type}
          autoFocus={autoFocus}
          disabled={disabled}
          value={actualValue}
          onChange={handleChange}
          placeholder={placeholder}
          flexGrow={1}
          flexShrink={1}
          minWidth={0} // https://stackoverflow.com/questions/42421361/input-button-elements-not-shrinking-in-a-flex-container
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          onKeyUp={onKeyUp}
          {...resolvePartStyles('Input.InputBase', workingProps, theme)}
          {...inputProps}
        />
      )}
      {multiline && (
        // @ts-expect-error
        <TextareaAutosize
          ref={forkedRef}
          autoFocus={autoFocus}
          disabled={disabled}
          value={actualValue}
          onChange={handleChange}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
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

const BaseInput = forwardRef(InputRef)

BaseInput.displayName = 'Input'
BaseInput.propTypes = inputPropTypes

export const Input = memo(BaseInput)
