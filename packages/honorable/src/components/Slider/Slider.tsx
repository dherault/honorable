// Inspired from https://mui.com/material-ui/api/slider/
import { MouseEvent as ReactMouseEvent, ReactNode, Ref, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'
import useRootStyles from '../../hooks/useRootStyles'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Div, DivProps } from '../tags'
import { Tooltip } from '../Tooltip/Tooltip'

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
  knobSize?: number
  markOffset?: number
  labelTooltipDisplay: 'on' | 'off'| 'auto'
}

export type SliderProps = DivProps & SliderBaseProps

type MarkProps = {
  label: ReactNode
  position: string
  isHorizontal: boolean
  markOffset: number
  styles: object
  innerStyles: object
}

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
  knobSize: PropTypes.number,
  markOffset: PropTypes.number,
  labelTooltipDisplay: PropTypes.oneOf(['on', 'off', 'auto']),
}

function Mark({ label, position, isHorizontal, markOffset, styles, innerStyles }: MarkProps) {
  const markRef = useRef<HTMLDivElement>()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!markRef.current) return

    setHeight(markRef.current.clientHeight)
  }, [])

  return (
    <Div
      ref={markRef}
      position="absolute"
      top={isHorizontal ? `calc(100% + ${markOffset}px)` : position}
      left={isHorizontal ? position : `calc(100% + ${markOffset}px)`}
      {...styles}
    >
      <Div
        position="relative"
        top={isHorizontal ? 0 : -height / 2}
        left={isHorizontal ? '-50%' : 0}
        opacity={height > 0 ? 1 : 0}
        {...innerStyles}
      >
        {label}
      </Div>
    </Div>
  )
}

function SliderRef(props: SliderProps, ref: Ref<any>) {
  const {
    defaultValue,
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
    knobSize = 16,
    markOffset = 8,
    labelTooltipDisplay = 'off',
    ...otherProps
  } = props
  const theme = useTheme()
  const sliderRef = useRef<HTMLDivElement>()
  const forkedRef = useForkedRef(ref, sliderRef)
  const [currentKnobIndex, setCurrentKnobIndex] = useState(-1)
  const [currentKnobValues, setCurrentKnobValues] = useState([0, 0, 0])
  const [currentPosition, setCurrenPosition] = useState(0)
  const [uncontrolledValues, setUncontrolledValues] = useState<number[]>(Array.isArray(defaultValue) ? defaultValue : [defaultValue || min])
  const actualValues = useMemo(() => (value ? Array.isArray(value) ? value : [value] : undefined) ?? uncontrolledValues, [value, uncontrolledValues])
  const isHorizontal = orientation === 'horizontal'
  const rootStyles = useRootStyles('Slider', props, theme)

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
    if (currentKnobIndex === -1 || disabled) return

    const delta = (isHorizontal ? event.clientX : event.clientY) - currentPosition

    const { [isHorizontal ? 'width' : 'height']: size } = sliderRef.current.getBoundingClientRect()

    let nextValue = Math.max(min, Math.min(max, currentKnobValues[1] + delta / size * (max - min)))

    if (typeof step === 'number' && step > 0) {
      nextValue = Math.round(nextValue / step) * step
    }

    if (noSwap) {
      nextValue = Math.max(currentKnobValues[0], Math.min(currentKnobValues[2], nextValue))
    }

    handleChange(event, nextValue, currentKnobIndex)
  }, [currentKnobIndex, currentKnobValues, currentPosition, isHorizontal, min, max, step, handleChange, noSwap, disabled])

  const handleMouseUp = useCallback((event: MouseEvent) => {
    if (typeof onChangeCommited === 'function') onChangeCommited(event, actualValues[currentKnobIndex], currentKnobIndex)

    setCurrentKnobIndex(-1)
  }, [onChangeCommited, actualValues, currentKnobIndex])

  function handleKnobMouseDown(event: ReactMouseEvent<HTMLDivElement>, index: number) {
    setCurrentKnobIndex(index)
    setCurrentKnobValues([actualValues[index - 1] || min, actualValues[index], actualValues[index + 1] || max])
    setCurrenPosition(isHorizontal ? event.clientX : event.clientY)
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  function wrapTooltip(index: number, node: ReactNode) {
    if (labelTooltipDisplay === 'on' || (labelTooltipDisplay === 'auto' && index === currentKnobIndex)) {
      return (
        <Tooltip
          key={index}
          open={labelTooltipDisplay === 'on' || currentKnobIndex === index}
          label={actualValues[index].toFixed(2)}
        >
          {node}
        </Tooltip>
      )
    }

    return node
  }

  return (
    <Div
      ref={forkedRef}
      position="relative"
      height={isHorizontal ? 8 : 256}
      width={isHorizontal ? 256 : 8}
      {...rootStyles}
      {...otherProps}
    >
      <Div
        width={isHorizontal ? '100%' : 8}
        height={isHorizontal ? 8 : '100%'}
        backgroundColor="black"
        {...resolvePartStyles('Slider.Track', props, theme)}
      />
      {actualValues.map((value, i) => wrapTooltip(i,
        <Div
          key={i}
          width={knobSize}
          height={knobSize}
          backgroundColor="blue"
          userSelect="none"
          position="absolute"
          borderRadius="50%"
          top={isHorizontal ? `calc(${-knobSize / 2}px + 50%)` : `calc(${valueToPosition(value)} - ${knobSize / 2}px)`}
          left={isHorizontal ? `calc(${valueToPosition(value)} - ${knobSize / 2}px)` : `calc(${-knobSize / 2}px + 50%)`}
          onMouseDown={event => handleKnobMouseDown(event, i)}
          {...resolvePartStyles('Slider.Knob', props, theme)}
        />
      ))}
      {Array.isArray(marks) && marks.map(({ label, value }, i) => (
        <Mark
          key={i}
          label={label || value}
          position={valueToPosition(value)}
          markOffset={markOffset}
          isHorizontal={isHorizontal}
          styles={resolvePartStyles('Mark', props, theme)}
          innerStyles={resolvePartStyles('Slider.MarkInner', props, theme)}
        />
      ))}
    </Div>
  )
}

export const Slider = forwardRef(SliderRef)

Slider.displayName = 'Slider'
// @ts-expect-error
Slider.propTypes = SliderPropTypes
