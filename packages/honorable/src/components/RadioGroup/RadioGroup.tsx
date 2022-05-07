import { ChangeEvent, Children, KeyboardEvent, MouseEvent, ReactElement, Ref, cloneElement, forwardRef, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { TargetWithValue } from '../../types'

import withHonorable from '../../withHonorable'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import useTheme from '../../hooks/useTheme'
import useOverridenProps from '../../hooks/useOverridenProps'

import enhanceEventTarget from '../../utils/enhanceEventTarget'

import { Radio } from '../Radio/Radio'
import { Flex, FlexProps } from '../Flex/Flex'
import { Div } from '../tags'

export type RadioGroupProps = FlexProps & {
  value?: any
  defaultValue?: any
  onChange?: (event: MouseEvent | KeyboardEvent | ChangeEvent) => void
  row?: boolean
}

export const radioGroupPropTypes = {
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  row: PropTypes.bool,
}

function RadioGroupRef(props: RadioGroupProps, ref: Ref<any>) {
  const {
    value,
    defaultValue,
    onChange,
    row = false,
    children,
    ...otherProps
  } = props
  const theme = useTheme()
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const actualValue = value ?? uncontrolledValue ?? false

  const childrenValues = useMemo(() => {
    const childrenValues: any[] = []

    Children.forEach(children, (child: ReactElement) => {
      if (child?.type === Radio && !child.props.disabled) {
        childrenValues.push(child.props.value)
      }
    })

    return childrenValues
  }, [children])

  // Override `value` prop in defaultStyles
  useOverridenProps(props, { value: actualValue })

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
      direction={row ? 'row' : 'column'}
      tabIndex={0}
      {...otherProps}
      onKeyDown={event => {
        handleKeyDown(event)
        if (typeof props.onKeyDown === 'function') props.onKeyDown(event)
      }}
    >
      {Children.map(children, (child: ReactElement) => {
        if (child?.type === Radio) {
          return (
            <Div {...resolvePartStyles('Radio', props, theme)}>
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

RadioGroupRef.displayName = 'RadioGroup'

const ForwaredRadioGroup = forwardRef(RadioGroupRef)

ForwaredRadioGroup.propTypes = radioGroupPropTypes

export const RadioGroup = withHonorable<RadioGroupProps>(ForwaredRadioGroup, 'RadioGroup')
