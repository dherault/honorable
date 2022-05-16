import { useMemo } from 'react'
import PropTypes from 'prop-types'

import DateTimeContext from '../../contexts/DateTimeContext'

export type DateTimeProviderProps = {
  children: React.ReactNode
  moment?: any
  luxon?: any
}

export const DateTimeProviderPropTypes = {
  children: PropTypes.node.isRequired,
  moment: PropTypes.any,
  luxon: PropTypes.any,
}

function wrapMoment(moment: any) {
  return {
    isMoment: true,
    create: (value: any) => moment(value),
    startOf: (dt: any, unit: string) => moment(dt).startOf(unit),
    add: (dt: any, amount: number, unit: string) => moment(dt).add(amount, unit),
    toISOString: (dt: any) => dt.toISOString(),
    format: (dt: any, format: string) => dt.format(format),
    weekday: (dt: any) => dt.day(),
    daysInMonth: (dt: any) => dt.daysInMonth(),
  }
}

function wrapLuxon(luxon: any) {
  return {
    isLuxon: true,
    create: (value: any) => luxon.fromISO(value),
    startOf: (dt: any, unit: string) => dt.startOf(unit),
    add: (dt: any, amount: number, unit: string) => dt.plus({ [unit]: amount }),
    toISOString: (dt: any) => dt.toISO(),
    format: (dt: any, format: string) => dt.toFormat(format.replaceAll('Y', 'y').replaceAll('M', 'L').replaceAll('d', 'c').replaceAll('D', 'd')),
    weekday: (dt: any) => dt.weekday,
    daysInMonth: (dt: any) => dt.daysInMonth,
  }
}

export function DateTimeProvider({ children, moment, luxon }: DateTimeProviderProps) {
  const shimmed = useMemo(() => moment ? wrapMoment(moment) : luxon ? wrapLuxon(luxon) : null, [moment, luxon])

  return (
    <DateTimeContext.Provider value={shimmed}>
      {children}
    </DateTimeContext.Provider>
  )
}

DateTimeProvider.propTypes = DateTimeProviderPropTypes
