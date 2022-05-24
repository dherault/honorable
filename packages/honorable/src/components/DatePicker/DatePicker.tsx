import { Ref, forwardRef, useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

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
  onChange?: (date: string | [string, string]) => void
  value?: string
  defaultValue?: string
  range?: boolean
  monthSpan?: number
  startDay?: number
  startDate?: string
  minYear?: number
  maxYear?: number
  transitionDuration?: number
  monthWidth?: number
  monthMargin?: number
}

export type DatePickerProps = DivProps & DatePickerBaseProps

export const DatePickerPropTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  range: PropTypes.bool,
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
    range = false,
    monthSpan = 1,
    startDay = 0,
    startDate,
    minYear = 1900,
    maxYear = 2099,
    transitionDuration = 650,
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
  const [displayedStartDate, setDisplayedStartDate] = useState(actualStartDate)
  const [dimensions, setDimensions] = useState<DimensionsType>({ width: 'auto', height: 'auto' })
  const [areYearsDisplayed, setAreYearsDisplayed] = useState(false)
  const [transitionGoal, setTransitionGoal] = useState(0)
  // const [transitionDirection, setTransitionDirection] = useState(0)
  const [isTransitionning, setIsTransitionning] = useState(false)
  const [isGoal, setIsGoal] = useState(true)
  const dayWidthBase = monthWidth / 7
  const viewportWidthBase = monthSpan * monthWidth
  const viewportWidth = viewportWidthBase + (monthSpan - 1) * monthMargin

  console.log('goal', transitionGoal)
  // console.log('goal -> current', transitionGoal, transitionDirection)

  useEffect(() => {
    const { width, height } = datePickerRef.current.getBoundingClientRect()

    setDimensions({ width, height })
  }, [monthSpan])

  useEffect(() => {
    if (DateTime.isSame(actualStartDate, DateTime.add(actualStartDate, transitionGoal, 'month'))) {
      return
    }

    // if (isTransitionning) return

    // if (transitionDirection === transitionGoal && transitionGoal !== 0) {
    //   setActualStartDate(DateTime.startOf(DateTime.add(actualStartDate, transitionGoal, 'month'), 'month'))
    //   setTransitionDirection(0)
    //   setTransitionGoal(0)
    //   setIsGoal(true)
    // }

    // const diff = transitionGoal - transitionDirection > 0 ? 1 : -1

    // setIsTransitionning(true)

    setTimeout(() => {
      // setIsTransitionning(false)
      // setTransitionDirection(transitionDirection + diff)
      setTransitionGoal(0)
      setActualStartDate(DateTime.startOf(DateTime.add(actualStartDate, transitionGoal, 'month'), 'month'))
    }, transitionDuration)
  }, [transitionGoal, transitionDuration, DateTime, actualStartDate])

  if (DateTime === null) {
    throw new Error('DatePicker: moment or luxon is not provided. Please provide moment or luxon props to DateTimeProvider as a parent.')
  }

  /*
    HANDLERS
  */

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
    setTransitionGoal(x => x + (isLeft ? -1 : 1))
    setDisplayedStartDate(DateTime.startOf(DateTime.add(displayedStartDate, isLeft ? -1 : 1, 'month'), 'month'))
    // setIsGoal(false)
  }

  /*
    RENDER MONTHS
  */

  function renderMonths() {
    const monthHeaderNodes = []
    const monthContentNodes = []

    for (let i = 0; i < monthSpan; i++) {
      const dt = DateTime.startOf(DateTime.add(displayedStartDate, i, 'month'), 'month')

      monthHeaderNodes.push(renderMonthHeader(dt, i))
    }

    for (let i = Math.min(0, transitionGoal); i < monthSpan + Math.max(0, transitionGoal); i++) {
      const dt = DateTime.startOf(DateTime.add(actualStartDate, i, 'month'), 'month')
      monthContentNodes.push(renderMonthContent(dt, i))
    }

    return (
      <>
        <Flex>
          {monthHeaderNodes}
        </Flex>
        <Flex
          mt={0.5}
          width={viewportWidth}
          overflowX="hidden"
        >
          <Flex
            wrap="no wrap"
            position="relative"
            left={transitionGoal > 0 ? -transitionGoal * (monthWidth + monthMargin) : 0}
            transition={transitionGoal ? `left ${transitionDuration}ms ease-in-out` : null}
            // {...resolvePartStyles('MonthsInner', props, theme)}
          >
            {monthContentNodes}
          </Flex>
        </Flex>
      </>
    )
  }

  function renderMonthHeader(dt: any, i: number) {
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
      </Div>
    )
  }

  function renderMonthAndYear(dt: any) {
    return (
      <Flex
        px={1}
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

  function renderMonthContent(dt: any, i: number) {
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
          day={DateTime.format(day, 'D')}
          active={DateTime.isSame(dtValue, day, 'day')}
          width={dayWidthBase}
          height={dayWidthBase}
          onClick={() => handleDayClick(day)}
        />
      )
    }

    return (
      <Flex
        marginRight={monthMargin}
        _last={{ marginRight: 0 }}
        align="center"
        wrap="wrap"
        width={monthWidth}
        id={dt.format('MM')}
        {...resolvePartStyles('Days', props, theme)}
      >
        {days}
      </Flex>
    )
  }

  /*
    RENDER YEARS
  */

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

  // function renderMonths() {
  //   const monthNodes = []

  //   for (let i = -1 + Math.min(shouldTransition, 0); i < monthSpan + 1 + Math.max(shouldTransition, 0); i++) {
  //     monthNodes.push(renderMonth(DateTime.startOf(DateTime.add(actualStartDate, i, 'month'), 'month'), i))
  //   }

  //   return (
  //     <Flex
  //       position="relative"
  //       width={3 * viewportWidthBase + 2 * monthMargin}
  //       left={-(
  //         shouldTransition * (monthWidth + monthMargin)
  //         + viewportWidthBase + monthSpan * monthMargin
  //       )}
  //       transition={shouldTransition ? `left ${transitionDuration}ms ease-in-out` : null}
  //       {...resolvePartStyles('MonthsInner', props, theme)}
  //     >
  //       {monthNodes}
  //     </Flex>
  //   )
  // }

  return (
    <Div
      ref={forkedRef}
      width={viewportWidth}
      position="relative"
      userSelect="none"
      {...otherProps}
    >
      {areYearsDisplayed ? renderYears() : renderMonths()}
      <Flex
        p={0.333}
        position="absolute"
        top={-8}
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
        p={0.333}
        position="absolute"
        top={-8}
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
  day?: string,
  active?: boolean
}

export type DatePickerDayProps = DivProps & DatePickerDayBaseProps

export const DatePickerDayPropTypes = {
  day: PropTypes.string,
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

export type DatePickerYearsProps = DivProps & DatePickerYearsBaseProps

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

export type DatePickerYearProps = DivProps & DatePickerYearBaseProps

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
