// Inspired from https://mui.com/material-ui/api/slider/
import { ReactNode, Ref, SyntheticEvent, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../../withHonorable'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Div, DivProps } from '../tags'

export type SliderMarkType = {
  label?: ReactNode
  value: number
}

export type SliderValueType = number | number[]

export type SliderBaseProps = {
  defaultValue?: number
  disabled?: boolean
  swapDisabled?: boolean
  marks?: SliderMarkType[]
  max?: number
  min?: number
  step?: number
  onChange?: (event: SyntheticEvent, value: number, activeThumb: number) => void
  onChangeCommited?: (event: SyntheticEvent, value: number, activeThumb: number) => void
  orientation?: 'horizontal' | 'vertical'
  value?: SliderValueType
  // valueLabelDisplay
  // valueLabelFormat
}

export type SliderProps = DivProps & SliderBaseProps

type SliderKnobProps = DivProps & {
  position: string
}

export const SliderPropTypes = {
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  swapDisabled: PropTypes.bool,
  marks: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.number.isRequired,
  })),
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func,
  onChangeCommited: PropTypes.func,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  value: PropTypes.number,
}

// TODO v1 loading
function SliderRef(props: SliderProps, ref: Ref<any>) {
  const {
    defaultValue,
    disabled,
    swapDisabled,
    marks,
    max = 1,
    min = 0,
    step,
    onChange,
    onChangeCommited,
    orientation = 'horizontal',
    value,
    ...otherProps
  } = props
  const theme = useTheme()
  const [uncontrolledValues, setUncontrolledValues] = useState<number[]>(Array.isArray(defaultValue) ? defaultValue : [defaultValue])
  const actualValues = (value ? Array.isArray(value) ? value : [value] : null) ?? uncontrolledValues

  const valueToPosition = useCallback((value: number) => `${(value - min) / (max - min) * 100}%`, [min, max])
  const positionToValue = useCallback((position: string) => {
    if (position.endsWith('%')) position = position.slice(0, -1)

    return parseFloat(position) * (max - min) / 100 + min
  }, [min, max])

  return (
    <Div
      ref={ref}
      position="relative"
      minHeight={8}
      minWidth={256}
      {...otherProps}
    >
      <Div
        height={8}
        backgroundColor="black"
      />
      {actualValues.map((value, i) => (
        <Div
          key={i}
          width={16}
          height={16}
          backgroundColor="blue"
          position="absolute"
          borderRadius="50%"
          top="-50%"
          left={`calc(${valueToPosition(value)} - 8px)`}
          {...props}
        />
      ))}
    </Div>
  )
}

SliderRef.displayName = 'Slider'

const ForwardedSlider = forwardRef(SliderRef)

// @ts-expect-error
ForwardedSlider.propTypes = SliderPropTypes

export const Slider = withHonorable<SliderProps>(ForwardedSlider, 'Slider')
