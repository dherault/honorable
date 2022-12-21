import { ChangeEvent, Children, KeyboardEvent, MouseEvent, ReactElement, Ref, cloneElement, forwardRef, memo, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps, TargetWithValue } from '../../types.js'

import useTheme from '../../hooks/useTheme.js'
import useRootStyles from '../../hooks/useRootStyles.js'

import resolvePartStyles from '../../resolvers/resolvePartStyles.js'

import enhanceEventTarget from '../../utils/enhanceEventTarget.js'
import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import { Radio } from '../Radio/Radio.js'
import { Flex } from '../Flex/Flex.js'
import { Div } from '../tags.js'

export const radioGroupParts = ['Radio'] as const

export const radioGroupPropTypes = {
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  row: PropTypes.bool,
}

export type RadioGroupBaseProps = {
  /**
   * The value of the selected Radio.
   */
  value?: any
  /**
   * The value of the selected Radio by default.
   */
  defaultValue?: any
  /**
   * Callback function called when the RadioGroup returns a value
   */
  onChange?: (event: TargetWithValue<MouseEvent | KeyboardEvent | ChangeEvent>) => void
  /**
   * Whether the RadioGroup is in a row or not
   */
  row?: boolean
}

export type RadioGroupProps = ComponentProps<RadioGroupBaseProps, 'div', typeof radioGroupParts[number]>

function RadioGroupRef(props: RadioGroupProps, ref: Ref<any>) {
  const {
    value,
    defaultValue,
    onChange,
    row,
    children,
    ...otherProps
  } = props
  const theme = useTheme()
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const actualValue = value ?? uncontrolledValue ?? false
  const workingProps = { ...props, value: actualValue, row }
  const rootStyles = useRootStyles('RadioGroup', workingProps, theme)

  const childrenValues = useMemo(() => {
    const childrenValues: any[] = []

    Children.forEach(children, (child: ReactElement) => {
      if (child?.type === Radio && !child.props.disabled) {
        childrenValues.push(child.props.value)
      }
    })

    return childrenValues
  }, [children])

  function handleChange(event: TargetWithValue<MouseEvent | KeyboardEvent | ChangeEvent>) {
    if (typeof onChange === 'function') onChange(event)
    setUncontrolledValue(event.target.value)
  }

  function handleKeyDown(event: KeyboardEvent) {
    if ((!row && event.code === 'ArrowDown') || (row && event.code === 'ArrowRight')) {
      const currentIndex = childrenValues.findIndex(value => value === actualValue)
      const value = childrenValues[currentIndex + 1] ?? childrenValues[0]

      handleChange(enhanceEventTarget(event, { value }))
    }
    if ((!row && event.code === 'ArrowUp') || (row && event.code === 'ArrowLeft')) {
      const currentIndex = childrenValues.findIndex(value => value === actualValue)
      const value = childrenValues[currentIndex - 1] ?? childrenValues[childrenValues.length - 1]

      handleChange(enhanceEventTarget(event, { value }))
    }
  }

  return (
    <Flex
      ref={ref}
      direction="column"
      // direction={row ? 'row' : 'column'}
      tabIndex={0}
      {...rootStyles}
      {...filterUndefinedValues(otherProps)}
      onKeyDown={event => {
        handleKeyDown(event)
        if (typeof props.onKeyDown === 'function') props.onKeyDown(event)
      }}
    >
      {Children.map(children, (child: ReactElement) => {
        if (child?.type === Radio) {
          return (
            <Div {...resolvePartStyles('RadioGroup.Radio', props, theme)}>
              {cloneElement(child, {
                ...child.props,
                checked: child.props.value === actualValue,
                onChange: handleChange,
              })}
            </Div>
          )
        }

        return child
      })}
    </Flex>
  )
}

const BaseRadioGroup = forwardRef(RadioGroupRef)

BaseRadioGroup.displayName = 'RadioGroup'
BaseRadioGroup.propTypes = radioGroupPropTypes

export const RadioGroup = memo(BaseRadioGroup)
