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

type DimensionsType = {
  width: number | 'auto'
  height: number | 'auto'
}

export type DatePickerBaseProps = {
  onChange?: (date: string) => void
  value?: string
  defaultValue?: string
  monthSpan?: number
  startDay?: number
  startDate?: string
  minYear?: number
  maxYear?: number
  transitionDuration?: number
}

export type DatePickerProps = HonorableProps<DivProps & DatePickerBaseProps>

export const DatePickerPropTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  monthSpan: PropTypes.number,
  startDay: PropTypes.number,
  startDate: PropTypes.string,
  minYear: PropTypes.number,
  maxYear: PropTypes.number,
  transitionDuration: PropTypes.number,
}

function DatePickerRef(props: DatePickerProps, ref: Ref<any>) {
  const {
    onChange,
    value,
    defaultValue,
    monthSpan = 1,
    startDay = 0,
    startDate,
    minYear = 1900,
    maxYear = 2099,
    transitionDuration = 400,
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
  const [areYearsDisplayed, setAreYearsDisplayed] = useState(false)
  const [shouldTransition, setShouldTransition] = useState<'left' | 'right' | null>(null)

  const monthWidthBase = 256
  const monthMargin = 2 * 16
  const dayWidthBase = monthWidthBase / 7
  const viewportWidthBase = monthSpan * monthWidthBase
  const viewportWidth = viewportWidthBase + (monthSpan - 1) * monthMargin

  useEffect(() => {
    const { width, height } = datePickerRef.current.getBoundingClientRect()

    setDimensions({ width, height })
  }, [monthSpan])

  if (DateTime === null) {
    throw new Error('DatePicker: moment or luxon is not provided. Please provide moment or luxon props to DateTimeProvider as a parent.')
  }

  function handleDayClick(dt: any) {
    const value = DateTime.toISOString(dt)

    if (typeof onChange === 'function') onChange(value)

    setUncontrolledValue(value)
  }

  function handleYearClick(year: number) {
    const dt = DateTime.setYear(actualStartDate, year)

    setActualStartDate(dt)
    setAreYearsDisplayed(false)
  }

  function handleStartDateChange(isLeft: boolean) {
    setShouldTransition(isLeft ? 'left' : 'right')

    setTimeout(() => {
      setActualStartDate(DateTime.startOf(DateTime.add(actualStartDate, isLeft ? -1 : 1, 'month'), 'month'))
      setShouldTransition(null)
    }, transitionDuration + 5 * 1000 / 60)
  }

  function renderMonth(dt: any, i: number) {
    const headerDays = []
    const startOfWeek = DateTime.startOf(dt, 'week')

    for (let i = startDay; i < startDay + 7; i++) {
      headerDays.push(
        <Flex
          key={i}
          width={dayWidthBase}
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
        marginRight={monthMargin}
        _last={{ marginRight: 0 }}
      >
        {renderMonthAndYear(dt, i)}
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
          width={dayWidthBase}
          height={dayWidthBase}
        />
      )
    }

    return (
      <Flex
        key={i}
        width={dayWidthBase}
        height={dayWidthBase}
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

  function renderMonthAndYear(dt: any, i: number) {
    return (
      <Flex
        mx={0.333}
        align="center"
      >
        {renderCaret(i, 'left')}
        <Div flexGrow={1} />
        <Flex
          align="center"
          cursor="pointer"
          onClick={() => setAreYearsDisplayed(x => !x)}
        >
          <Div>
            {DateTime.format(dt, 'MMMM')}
          </Div>
          <Div ml={0.5}>
            {DateTime.format(dt, 'YYYY')}
          </Div>
        </Flex>
        <Div flexGrow={1} />
        {renderCaret(i, 'right')}
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
          cursor="pointer"
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
          width={18}
          rotation={90}
        />
      )
    }

    if (i === monthSpan - 1 && direction === 'right') {
      return withWrapper(
        false,
        <Caret
          width={18}
          rotation={-90}
        />
      )
    }

    return (
      <Div
        width={24}
        height={24}
      />
    )
  }

  function renderYears() {
    return (
      <Div
        ref={ref}
        width={dimensions.width}
        height={dimensions.height}
      >
        <Flex
          width={monthWidthBase}
          height="100%"
          direction="column"
          align="center"
        >
          {renderMonthAndYear(actualStartDate, -1)}
          <DatePickerYears
            mt={1}
            minYear={minYear}
            maxYear={maxYear}
            currentYear={DateTime.year(actualStartDate)}
            dimensions={dimensions}
            onYearClick={handleYearClick}
          />
        </Flex>
      </Div>
    )
  }

  function renderMonths() {
    const monthNodes = []

    for (let i = -monthSpan; i < 2 * monthSpan; i++) {
      monthNodes.push(renderMonth(DateTime.startOf(DateTime.add(actualStartDate, i, 'month'), 'month'), i))
    }

    console.log('shouldTransition', shouldTransition)

    return (
      <Flex
        position="relative"
        width={3 * viewportWidthBase + 2 * monthMargin}
        left={
          (shouldTransition === null ? 0 : ((shouldTransition === 'left' ? 1 : -1) * (monthWidthBase + monthMargin)))
          - (viewportWidthBase + monthSpan * monthMargin)
        }
        transition={shouldTransition ? `left ${transitionDuration}ms ease-in-out` : null}
      >
        {monthNodes}
      </Flex>
    )
  }

  return (
    <Div
      ref={forkedRef}
      width={viewportWidth}
      overflowX="hidden"
      userSelect="none"
      {...otherProps}
    >
      {areYearsDisplayed ? renderYears() : renderMonths()}
    </Div>
  )
}

DatePickerRef.displayName = 'DatePicker'

const ForwardedDatePicker = forwardRef(DatePickerRef)

ForwardedDatePicker.propTypes = DatePickerPropTypes

export const DatePicker = withHonorable<DatePickerProps>(ForwardedDatePicker, 'DatePicker')

/*
  DatePickerYears
*/

export type DatePickerYearsBaseProps = {
  minYear: number,
  maxYear: number,
  currentYear: number,
  onYearClick: (year: number) => void,
}

export type DatePickerYearsProps = HonorableProps<DivProps & DatePickerYearsBaseProps>

export const DatePickerYearsPropTypes = {
  minYear: PropTypes.number,
  maxYear: PropTypes.number,
  currentYear: PropTypes.number,
  onYearClick: PropTypes.func,
}

function DatePickerYearsRef({
  minYear,
  maxYear,
  currentYear,
  onYearClick,
  ...props
}: DatePickerYearsProps,
ref: Ref<any>
) {
  const currentYearRef = useRef<HTMLDivElement>()
  const yearNodes = []

  for (let i = minYear; i <= maxYear; i++) {
    yearNodes.push(
      <DatePickerYear
        key={i}
        ref={i === currentYear ? currentYearRef : null}
        year={i}
        active={i === currentYear}
        onClick={() => onYearClick(i)}
        height={36}
      />
    )
  }

  useEffect(() => {
    currentYearRef.current.scrollIntoView({
      block: 'center',
    })
  }, [currentYear])

  return (
    <Flex
      ref={ref}
      height={5 * 36}
      wrap="wrap"
      align="flex-start"
      justify="flex-start"
      overflowY="auto"
      {...props}
    >
      {yearNodes}
    </Flex>
  )
}

DatePickerYearsRef.displayName = 'DatePicker'

const ForwardedDatePickerYears = forwardRef(DatePickerYearsRef)

ForwardedDatePickerYears.propTypes = DatePickerYearsPropTypes

export const DatePickerYears = withHonorable<DatePickerYearsProps>(ForwardedDatePickerYears, 'DatePickerYears')

/*
  DatePickerYear
*/

export type DatePickerYearBaseProps = {
  year: number
  active: boolean
}

export type DatePickerYearProps = HonorableProps<DivProps & DatePickerYearBaseProps>

export const DatePickerYearPropTypes = {
  dimensions: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  minYear: PropTypes.number,
  maxYear: PropTypes.number,
  currentYear: PropTypes.number,
}

function DatePickerYearRef({
  year,
  active,
  ...props
}: DatePickerYearProps,
ref: Ref<any>
) {
  return (
    <Flex
      ref={ref}
      py={0.5}
      px={1}
      align="center"
      justify="center"
      border="1px solid transparent"
      borderColor={active ? 'black' : 'transparent'}
      width="25%"
      _hover={{ borderColor: 'black' }}
      {...props}
    >
      {year}
    </Flex>
  )
}

DatePickerYearRef.displayName = 'DatePicker'

const ForwardedDatePickerYear = forwardRef(DatePickerYearRef)

ForwardedDatePickerYear.propTypes = DatePickerYearPropTypes

export const DatePickerYear = withHonorable<DatePickerYearProps>(ForwardedDatePickerYear, 'DatePickerYears')
