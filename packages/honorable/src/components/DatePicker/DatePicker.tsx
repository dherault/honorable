import { ReactNode, Ref, forwardRef, useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import DateTimeContext from '../../contexts/DateTimeContext'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'

import { Div, DivProps } from '../tags'
import { Flex } from '../Flex/Flex'
import { Caret } from '../Caret/Caret'

export type DatePickerBaseProps = {
  onChange?: (date: string) => void
  value?: string
  defaultValue?: string
  monthSpan?: number
  startDay?: number
  startDate?: string
}

export type DatePickerProps = HonorableProps<DivProps & DatePickerBaseProps>

type DimensionsType = {
  width: number | 'auto'
  height: number | 'auto'
}

export const DatePickerPropTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  monthSpan: PropTypes.number,
  startDay: PropTypes.number,
  startDate: PropTypes.string,
}

function DatePickerRef(props: DatePickerProps, ref: Ref<any>) {
  const {
    onChange,
    value,
    defaultValue,
    monthSpan = 1,
    startDay = 0,
    startDate,
    ...otherProps
  } = props
  const theme = useTheme()
  const datePickerRef = useRef<HTMLDivElement>()
  const forkedRef = useForkedRef(ref, datePickerRef)
  const DateTime = useContext(DateTimeContext)
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || new Date().toISOString())
  const actualValue = value ?? uncontrolledValue
  const dtValue = DateTime.create(actualValue)
  const [actualStartDate, setActualStartDate] = useState(DateTime.startOf(startDate ? DateTime.create(startDate) : dtValue, 'month'))
  const [dimensions, setDimensions] = useState<DimensionsType>({ width: 'auto', height: 'auto' })

  useEffect(() => {
    const { width, height } = datePickerRef.current.getBoundingClientRect()

    setDimensions({ width, height })
  }, [])

  if (DateTime === null) {
    throw new Error('DatePicker: moment or luxon is not provided. Please provide moment or luxon props to DateTimeProvider as a parent.')
  }

  function handleDayClick(dt: any) {
    const value = DateTime.toISOString(dt)

    if (typeof onChange === 'function') onChange(value)

    setUncontrolledValue(value)
  }

  function handleStartDateChange(isLeft: boolean) {
    setActualStartDate(DateTime.startOf(DateTime.add(actualStartDate, isLeft ? -1 : 1, 'month'), 'month'))
  }

  function renderMonth(dt: any, i: number) {
    const headerDays = []
    const startOfWeek = DateTime.startOf(dt, 'week')

    for (let i = startDay; i < startDay + 7; i++) {
      headerDays.push(
        <Flex
          key={i}
          width={256 / 7}
          align="center"
          justify="center"
        >
          {DateTime.format(DateTime.add(startOfWeek, i, 'day'), 'ddd').slice(0, 2)}
        </Flex>
      )
    }

    const days = []
    const monthStartDay = (DateTime.weekday(dt) + (DateTime.isLuxon ? -1 : 0)) % 7
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
          cursor="pointer"
        >
          {renderCaret(i, 'left')}
          <Div flexGrow={1} />
          <Div>
            {DateTime.format(dt, 'MMMM')}
          </Div>
          <Div ml={0.5}>
            {DateTime.format(dt, 'YYYY')}
          </Div>
          <Div flexGrow={1} />
          {renderCaret(i, 'right')}
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
        {...{ '&:hover > div': { borderColor: 'black' } }}
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

  function renderCaret(i: number, direction: 'left' | 'right') {
    function withWrapper(isLeft: boolean, node: ReactNode) {
      return (
        <Flex
          align="center"
          justify="center"
          width={24}
          height={24}
          borderRadius="50%"
          border="1px solid transparent"
          _hover={{ borderColor: 'black' }}
          onClick={() => handleStartDateChange(isLeft)}
        >
          {node}
        </Flex>
      )
    }

    if (i === 0 && direction === 'left') {
      return withWrapper(
        true,
        <Caret
          width={16}
          rotation={90}
        />
      )
    }

    if (i === monthSpan - 1 && direction === 'right') {
      return withWrapper(
        false,
        <Caret
          width={16}
          rotation={-90}
        />
      )
    }

    return <Div width={16} />
  }

  const monthNodes = []

  for (let i = 0; i < monthSpan; i++) {
    monthNodes.push(renderMonth(DateTime.startOf(DateTime.add(actualStartDate, i, 'month'), 'month'), i))
  }

  return (
    <Div
      ref={forkedRef}
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
