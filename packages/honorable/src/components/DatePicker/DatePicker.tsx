import { Ref, forwardRef, useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import DateTimeContext from '../../contexts/DateTimeContext'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

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
  monthWidth?: number
  monthMargin?: number
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
  monthWidth: PropTypes.number,
  monthMargin: PropTypes.number,
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
    monthWidth = 256,
    monthMargin = 32,
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
  const [shouldTransition, setShouldTransition] = useState<number>(0)
  const [transitionTimeoutId, setTransitionTimeoutId] = useState<NodeJS.Timeout>()
  const dayWidthBase = monthWidth / 7
  const viewportWidthBase = monthSpan * monthWidth
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
    setShouldTransition(x => x + (isLeft ? -1 : 1))

    clearTimeout(transitionTimeoutId)

    setTransitionTimeoutId(setTimeout(() => {
      setActualStartDate(DateTime.startOf(DateTime.add(actualStartDate, shouldTransition + (isLeft ? -1 : 1), 'month'), 'month'))
      setShouldTransition(0)
    }, transitionDuration + 12 * 1000 / 60))
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
          {...resolvePartStyles('WeekDay', props, theme)}
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
      days.push(
        <DatePickerDay
          key={`${i}null`}
          day={null}
          width={dayWidthBase}
          height={dayWidthBase}
        />
      )
    }

    for (let i = 0; i < daysInMonth; i++) {
      const day = DateTime.startOf(DateTime.add(dt, i, 'day'), 'day')

      days.push(
        <DatePickerDay
          key={i}
          day={day.format('D')}
          active={DateTime.isSame(dtValue, day, 'day')}
          width={dayWidthBase}
          height={dayWidthBase}
          onClick={() => handleDayClick(day)}
        />
      )
    }

    return (
      <Div
        key={i}
        marginRight={monthMargin}
        _last={{ marginRight: 0 }}
        {...resolvePartStyles('Month', props, theme)}
      >
        {renderMonthAndYear(dt)}
        <Flex
          mt={1}
          align="center"
          width={monthWidth}
          {...resolvePartStyles('WeekDays', props, theme)}
        >
          {headerDays}
        </Flex>
        <Flex
          mt={0.5}
          align="center"
          wrap="wrap"
          width={monthWidth}
          {...resolvePartStyles('Days', props, theme)}
        >
          {days}
        </Flex>
      </Div>
    )
  }

  function renderMonthAndYear(dt: any) {
    return (
      <Flex
        mx={0.333}
        align="center"
        justify="center"
        {...resolvePartStyles('MonthAndYear', props, theme)}
      >
        <Flex
          align="center"
          cursor="pointer"
          onClick={() => setAreYearsDisplayed(x => !x)}
          {...resolvePartStyles('MonthAndYearInner', props, theme)}
        >
          {DateTime.format(dt, 'MMMM')} {DateTime.format(dt, 'YYYY')}
        </Flex>
      </Flex>
    )
  }

  function renderYears() {
    return (
      <Div
        ref={ref}
        width={dimensions.width}
        height={dimensions.height}
        {...resolvePartStyles('Years', props, theme)}
      >
        <Flex
          width={monthWidth}
          height="100%"
          direction="column"
          align="center"
          {...resolvePartStyles('YearsInner', props, theme)}
        >
          {renderMonthAndYear(actualStartDate)}
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

    for (let i = -1 + Math.min(shouldTransition, 0); i < monthSpan + 1 + Math.max(shouldTransition, 0); i++) {
      monthNodes.push(renderMonth(DateTime.startOf(DateTime.add(actualStartDate, i, 'month'), 'month'), i))
    }

    return (
      <Flex
        position="relative"
        width={3 * viewportWidthBase + 2 * monthMargin}
        left={-(
          shouldTransition * (monthWidth + monthMargin)
          + viewportWidthBase + monthSpan * monthMargin
        )}
        transition={shouldTransition ? `left ${transitionDuration}ms ease-in-out` : null}
        {...resolvePartStyles('MonthsInner', props, theme)}
      >
        {monthNodes}
      </Flex>
    )
  }

  return (
    <Div
      ref={forkedRef}
      position="relative"
      userSelect="none"
      {...otherProps}
    >
      <Div
        width={viewportWidth}
        position="relative"
        overflowX="hidden"
        {...resolvePartStyles('Months', props, theme)}
      >
        {areYearsDisplayed ? renderYears() : renderMonths()}
      </Div>
      <Flex
        p={0.25}
        position="absolute"
        top={-6}
        left={2}
        align="center"
        justify="center"
        borderRadius="50%"
        border="1px solid transparent"
        cursor="pointer"
        _hover={{ borderColor: 'black' }}
        onClick={() => handleStartDateChange(true)}
        {...resolvePartStyles('Caret', props, theme)}
      >
        <Caret
          width={22}
          rotation={90}
        />
      </Flex>
      <Flex
        p={0.25}
        position="absolute"
        top={-6}
        right={2}
        align="center"
        justify="center"
        borderRadius="50%"
        border="1px solid transparent"
        cursor="pointer"
        _hover={{ borderColor: 'black' }}
        onClick={() => handleStartDateChange(false)}
        {...resolvePartStyles('Caret', props, theme)}
      >
        <Caret
          width={22}
          rotation={-90}
        />
      </Flex>
    </Div>
  )
}

DatePickerRef.displayName = 'DatePicker'

const ForwardedDatePicker = forwardRef(DatePickerRef)

ForwardedDatePicker.propTypes = DatePickerPropTypes

export const DatePicker = withHonorable<DatePickerProps>(ForwardedDatePicker, 'DatePicker')

/*
  DatePickerDay
*/

export type DatePickerDayBaseProps = {
  day: number,
  active?: boolean
}

export type DatePickerDayProps = HonorableProps<DivProps & DatePickerDayBaseProps>

export const DatePickerDayPropTypes = {
  day: PropTypes.number.isRequired,
  active: PropTypes.bool,
}

function DatePickerDayRef(props: DatePickerDayProps, ref: Ref<any>) {
  const {
    day,
    active = false,
    ...otherProps
  } = props
  const theme = useTheme()

  if (day === null) {
    return (
      <Div
        ref={ref}
        {...otherProps}
      />
    )
  }

  const styles = { '&:hover > div': { borderColor: 'black' } }

  if (active) styles['& > div'] = { borderColor: 'black' }

  return (
    <Flex
      cursor="pointer"
      {...styles}
      {...otherProps}
    >
      <Flex
        flexGrow={1}
        align="center"
        justify="center"
        borderRadius="50%"
        border="1px solid transparent"
        {...resolvePartStyles('Inner', props, theme)}
      >
        {day}
      </Flex>
    </Flex>
  )
}

DatePickerDayRef.displayName = 'DatePickerDay'

const ForwardedDatePickerDay = forwardRef(DatePickerDayRef)

ForwardedDatePickerDay.propTypes = DatePickerDayPropTypes

export const DatePickerDay = withHonorable<DatePickerDayProps>(ForwardedDatePickerDay, 'DatePickerDay')

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

DatePickerYearsRef.displayName = 'DatePickerYears'

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

DatePickerYearRef.displayName = 'DatePickerYear'

const ForwardedDatePickerYear = forwardRef(DatePickerYearRef)

ForwardedDatePickerYear.propTypes = DatePickerYearPropTypes

export const DatePickerYear = withHonorable<DatePickerYearProps>(ForwardedDatePickerYear, 'DatePickerYear')
