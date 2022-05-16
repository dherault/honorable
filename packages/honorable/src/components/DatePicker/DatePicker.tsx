import { Ref, forwardRef, useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import DateTimeContext from '../../contexts/DateTimeContext'

import useTheme from '../../hooks/useTheme'

import { Div, DivProps } from '../tags'
import { Flex } from '../Flex/Flex'

export type DatePickerBaseProps = {
  onChange?: (date: string) => void
  value?: string
  defaultValue?: string
  monthSpan?: number
  startDay?: number
}

export type DatePickerProps = HonorableProps<DivProps & DatePickerBaseProps>

export const DatePickerPropTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  monthSpan: PropTypes.number,
  startDay: PropTypes.number,
}

function DatePickerRef(props: DatePickerProps, ref: Ref<any>) {
  const {
    onChange,
    value,
    defaultValue,
    monthSpan = 1,
    startDay = 0,
    ...otherProps
  } = props
  const theme = useTheme()
  const DateTime = useContext(DateTimeContext)
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || new Date().toISOString())
  const actualValue = value ?? uncontrolledValue
  console.log('DateTime', DateTime)
  const dtValue = DateTime.create(actualValue)
  const [startDate, setStartDate] = useState(DateTime.startOf(dtValue, 'month'))

  if (DateTime === null) {
    throw new Error('DatePicker: moment or luxon is not provided. Please provide moment or luxon props to DateTimeProvider as a parent.')
  }

  function handleDayClick(dt: any) {
    const value = DateTime.toISOString(dt)

    if (typeof onChange === 'function') onChange(value)

    setUncontrolledValue(value)
  }

  function renderMonth(dt: any, i: number) {
    const headerDays = []

    for (let i = startDay; i < startDay + 7; i++) {
      headerDays.push(
        <Flex
          key={i}
          width={256 / 7}
          align="center"
          justify="center"
        >
          {DateTime.format(DateTime.add(dt, i, 'day'), 'ddd').slice(0, 2)}
        </Flex>
      )
    }

    const days = []
    const monthStartDay = DateTime.day(dt)
    const maxI = monthStartDay < startDay ? monthStartDay + 7 : monthStartDay
    const daysInMonth = DateTime.daysInMonth(dt)

    for (let i = startDay % 7; i < maxI; i++) {
      days.push(renderDay(null, i))
    }

    for (let i = 0; i < daysInMonth; i++) {
      days.push(renderDay(DateTime.startOf(DateTime.add(dt, i, 'day'), 'day'), i))
    }

    return (
      <Div
        key={i}
        mr={2}
        _last={{ mr: 0 }}
      >
        <Flex
          align="center"
          justify="center"
          cursor="pointer"
        >
          <Div>
            {DateTime.format(dt, 'MMMM')}
          </Div>
          <Div ml={0.5}>
            {DateTime.format(dt, 'YYYY')}
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

  function renderDay(dt: any, i: number) {
    if (dt === null) {
      return (
        <Div
          key={`${i}null`}
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
        {...{ '&:hover > div': { border: '1px solid black' } }}
        onClick={() => handleDayClick(dt)}
      >
        <Flex
          flexGrow={1}
          align="center"
          justify="center"
          borderRadius="50%"
          border="1px solid transparent"
        >
          {DateTime.format(dt, 'D')}
        </Flex>
      </Flex>
    )
  }

  const monthNodes = []

  for (let i = 0; i < monthSpan; i++) {
    monthNodes.push(renderMonth(DateTime.startOf(DateTime.add(startDate, i, 'month'), 'month'), i))
  }

  return (
    <Div
      ref={ref}
      display="flex"
      userSelect="none"
      {...otherProps}
    >
      {monthNodes}
    </Div>
  )
}

DatePickerRef.displayName = 'DatePicker'

const ForwardedDatePicker = forwardRef(DatePickerRef)

ForwardedDatePicker.propTypes = DatePickerPropTypes

export const DatePicker = withHonorable<DatePickerProps>(ForwardedDatePicker, 'DatePicker')
