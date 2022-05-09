// Inspired from https://mui.com/material-ui/api/slider/
import { ReactNode, Ref, SyntheticEvent, forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../../withHonorable'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Div, DivProps } from '../tags'

type MarkType = {
  label?: ReactNode
  value: number
}

type ValueType = number | number[]

export type SliderProps = DivProps & {
  defaultValue?: number
  disabled?: boolean
  swapDisabled?: boolean
  marks?: MarkType[]
  max?: number
  min?: number
  step?: number
  onChange?: (event: SyntheticEvent, value: number, activeThumb: number) => void
  onChangeCommited?: (event: SyntheticEvent, value: number, activeThumb: number) => void
  orientation?: 'horizontal' | 'vertical'
  value?: ValueType
  // valueLabelDisplay
  // valueLabelFormat
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
    ...otherProps
  } = props
  const theme = useTheme()

  return (
    <Div
      ref={ref}
      {...otherProps}
    >
      foo
    </Div>
  )
}

SliderRef.displayName = 'Slider'

const ForwardedSlider = forwardRef(SliderRef)

// @ts-expect-error
ForwardedSlider.propTypes = SliderPropTypes

export const Slider = withHonorable<SliderProps>(ForwardedSlider, 'Slider')