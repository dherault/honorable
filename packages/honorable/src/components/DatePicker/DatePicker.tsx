import { Ref, forwardRef, useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import MomentContext from '../../contexts/MomentContext'

import useTheme from '../../hooks/useTheme'

import { Div, DivProps } from '../tags'
import { Flex } from '../Flex/Flex'

export type DatePickerBaseProps = {
  onChange?: (date: string) => void
  value?: string
  defaultValue?: string
  monthSpan?: number
  startDayOfWeek?: number
}

export type DatePickerProps = HonorableProps<DivProps & DatePickerBaseProps>

export const DatePickerPropTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  monthSpan: PropTypes.number,
  startDayOfWeek: PropTypes.number,
}

function DatePickerRef(props: DatePickerProps, ref: Ref<any>) {
  const {
    onChange,
    value,
    defaultValue,
    monthSpan = 1,
    startDayOfWeek = 0,
    ...otherProps
  } = props
  const theme = useTheme()
  const moment = useContext(MomentContext)
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || new Date().toISOString())
  const actualValue = value ?? uncontrolledValue
  const [startDate, setStartDate] = useState(moment(actualValue).startOf('month'))

  if (moment === null) {
    throw new Error('DatePicker: moment is not provided. Please provide moment to DateTimePickerMomentProvider as a parent.')
  }

  function renderMonth(mx: any) {
    const headerDays = []

    for (let i = startDayOfWeek; i < startDayOfWeek + 7; i++) {
      headerDays.push(
        <Flex
          key={i}
          width={256 / 7}
          align="center"
          justify="center"
        >
          {moment(mx).add(i, 'day').format('dd')}
        </Flex>
      )
    }
    const days = []

    for (let i = startDayOfWeek; i < mx.day(); i++) {
      days.push(renderDay(null, i))
    }

    for (let i = 0; i < mx.daysInMonth(); i++) {
      days.push(renderDay(moment(mx).add(i, 'day'), i))
    }

    return (
      <Div
        key={mx.toISOString()}
        mr={1}
        _last={{
          mr: 0,
        }}
      >
        <Flex
          align="center"
          justify="center"
          cursor="pointer"
        >
          <Div>
            {mx.format('MMMM')}
          </Div>
          <Div ml={0.5}>
            {mx.format('YYYY')}
          </Div>
        </Flex>
        <Flex
          mt={1}
          align="center"
          width={256}
        >
          {headerDays}
        </Flex>
        <Flex
          mt={0.5}
          align="center"
          wrap="wrap"
          width={256}
        >
          {days}
        </Flex>
      </Div>
    )
  }

  function renderDay(mx: any, i: number) {
    if (mx === null) {
      return (
        <Div
          key={i}
          width={256 / 7}
          height={256 / 7}
        />
      )
    }

    return (
      <Flex
        key={i}
        width={256 / 7}
        height={256 / 7}
        cursor="pointer"
        {...{ '&:hover > div': {
          border: '1px solid black',
        } }}
      >
        <Flex
          flexGrow={1}
          align="center"
          justify="center"
          borderRadius="50%"
          border="1px solid transparent"
        >
          {mx.format('D')}
        </Flex>
      </Flex>
    )
  }

  const monthNodes = []

  for (let i = 0; i < monthSpan; i++) {
    monthNodes.push(renderMonth(moment(startDate).add(i, 'month').startOf('month')))
  }

  return (
    <Div
      ref={ref}
      display="flex"
      {...props}
    >
      {monthNodes}
    </Div>
  )
}

DatePickerRef.displayName = 'DatePicker'

const ForwardedDatePicker = forwardRef(DatePickerRef)

ForwardedDatePicker.propTypes = DatePickerPropTypes

export const DatePicker = withHonorable<DatePickerProps>(ForwardedDatePicker, 'DatePicker')
