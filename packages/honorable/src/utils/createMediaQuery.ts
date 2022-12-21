import { HonorableTheme } from '../types.js'

import filterObject from './filterObject.js'

function createBetweenMediaQuery(
  breakpoints: Record<string, number>,
  breakpoint1: string | number,
  breakpoint2?: string | number,
) {
  let actualBreakpoint2 = breakpoint2

  if (typeof actualBreakpoint2 === 'undefined') {
    const breakpontEntries = Object.entries(breakpoints).sort(([, value1], [, value2]) => value1 - value2)
    const breakpoint1Index = breakpontEntries.findIndex(([key, value]) => key === breakpoint1 || value === breakpoint1)

    const entry = breakpontEntries[breakpoint1Index + 1]

    if (entry) [actualBreakpoint2] = entry
  }

  const breakpoint1Value = typeof breakpoint1 === 'string' ? breakpoints[breakpoint1] : breakpoint1
  const breakpoint2Value = typeof actualBreakpoint2 === 'string' ? breakpoints[actualBreakpoint2] : actualBreakpoint2

  if (typeof breakpoint2Value !== 'number') return `(min-width: ${breakpoint1Value}px)`

  const min = breakpoint1Value < breakpoint2Value ? breakpoint1Value : breakpoint2Value
  const max = breakpoint1Value > breakpoint2Value ? breakpoint1Value : breakpoint2Value

  return `(min-width: ${min}px) and (max-width: ${max - 1}px)`
}

function createMediaQuery(
  theme: HonorableTheme,
  upOrDownOrBetweenOrOnlyOrNotOrQuery: 'up' | 'down' | 'between' | 'only' | 'not' | string,
  breakpoint1?: string | number,
  breakpoint2?: string | number,
) {
  const breakpoints = filterObject(theme.breakpoints!)
  const breakpoint1Value = (typeof breakpoint1 === 'string' ? breakpoints[breakpoint1] : breakpoint1)

  if (typeof breakpoint1Value !== 'number') return null

  switch (upOrDownOrBetweenOrOnlyOrNotOrQuery) {
    case 'up': {
      return `(min-width: ${breakpoint1Value}px)`
    }
    case 'down': {
      return `(max-width: ${breakpoint1Value - 1}px)`
    }
    case 'between': {
      return createBetweenMediaQuery(breakpoints, breakpoint1Value, breakpoint2)
    }
    case 'only': {
      return createBetweenMediaQuery(breakpoints, breakpoint1Value)
    }
    case 'not': {
      return `not ${createBetweenMediaQuery(breakpoints, breakpoint1Value)}`
    }
    default: {
      return upOrDownOrBetweenOrOnlyOrNotOrQuery
    }
  }
}

export default createMediaQuery
