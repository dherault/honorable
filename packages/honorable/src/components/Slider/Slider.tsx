// Inspired from https://mui.com/material-ui/api/slider/
import { MouseEvent as ReactMouseEvent, ReactNode, Ref, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { HonorableProps } from '../../types'

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
  value?: SliderValueType
  defaultValue?: SliderValueType
  marks?: SliderMarkType[]
  max?: number
  min?: number
  step?: number
  noSwap?: boolean
  orientation?: 'horizontal' | 'vertical'
  onChange?: (event: MouseEvent, value: number, knobIndex: number) => void
  onChangeCommited?: (event: MouseEvent, value: number, knobIndex: number) => void
  disabled?: boolean
  // valueLabelDisplay
  // valueLabelFormat
}

export type SliderProps = HonorableProps<DivProps & SliderBaseProps>

export const SliderPropTypes = {
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
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
  noSwap: PropTypes.bool,
}

// TODO v1 loading
function SliderRef(props: SliderProps, ref: Ref<any>) {
  const {
    defaultValue = 0,
    disabled,
    marks,
    max = 1,
    min = 0,
    step,
    onChange,
    onChangeCommited,
    orientation = 'horizontal',
    noSwap = false,
    value,
    ...otherProps
  } = props
  const theme = useTheme()
  const sliderRef = useRef<HTMLDivElement>()
  const forkedRef = useForkedRef(ref, sliderRef)
  const [currentKnobIndex, setCurrentKnobIndex] = useState(-1)
  const [currentKnobValues, setCurrentKnobValues] = useState([0, 0, 0])
  const [currentClientX, setCurrenClientX] = useState(0)
  const [uncontrolledValues, setUncontrolledValues] = useState<number[]>(Array.isArray(defaultValue) ? defaultValue : [defaultValue])
  const actualValues = useMemo(() => (value ? Array.isArray(value) ? value : [value] : null) ?? uncontrolledValues, [value, uncontrolledValues])

  const valueToPosition = useCallback((value: number) => `${(value - min) / (max - min) * 100}%`, [min, max])

  const handleChange = useCallback((event: MouseEvent, value: number, knobIndex: number,) => {
    setUncontrolledValues(values => {
      const nextValues = [...values]

      nextValues[knobIndex] = value

      return nextValues
    })

    if (typeof onChange === 'function') onChange(event, value, knobIndex)
  }, [onChange])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (currentKnobIndex === -1) return

    const delta = event.clientX - currentClientX
    const { width } = sliderRef.current.getBoundingClientRect()

    let nextValue = Math.max(min, Math.min(max, currentKnobValues[1] + delta / width * (max - min)))

    if (typeof step === 'number' && step > 0) {
      nextValue = Math.round(nextValue / step) * step
    }

    if (noSwap) {
      nextValue = Math.max(currentKnobValues[0], Math.min(currentKnobValues[2], nextValue))
    }

    handleChange(event, nextValue, currentKnobIndex)
  }, [currentKnobIndex, currentKnobValues, currentClientX, min, max, step, handleChange, noSwap])

  function handleMouseUp() {
    setCurrentKnobIndex(-1)
  }

  function handleKnobMouseDown(event: ReactMouseEvent<HTMLDivElement>, index: number) {
    setCurrentKnobIndex(index)
    setCurrentKnobValues([actualValues[index - 1] || min, actualValues[index], actualValues[index + 1] || max])
    setCurrenClientX(event.clientX)
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove])

  return (
    <Div
      ref={forkedRef}
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
          userSelect="none"
          position="absolute"
          borderRadius="50%"
          top="-50%"
          left={`calc(${valueToPosition(value)} - 8px)`}
          onMouseDown={event => handleKnobMouseDown(event, i)}
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
