import { useCallback, useEffect, useMemo, useState } from 'react'

import filterObject from '../utils/filterObject'
import createMediaQuery from '../utils/createMediaQuery'

import useTheme from './useTheme'

function usePropWithBreakpoints(prop: any) {
  const theme = useTheme()
  const breakpointEntries = useMemo(() => Object.entries(filterObject(theme.breakpoints!)).sort(([, valueA], [, valueB]) => valueA - valueB), [theme])

  const getActiveBreakpoint = useCallback(() => {
    for (const [breakpointName] of breakpointEntries) {
      const query = createMediaQuery(theme, 'only', breakpointName)

      if (!query) continue
      if (window.matchMedia(query).matches) return breakpointName
    }

    return null
  }, [theme, breakpointEntries])

  const [activeBreakpoint, setActiveBreakpoint] = useState(getActiveBreakpoint())

  const getClosestValue = useCallback(() => {
    // Not an object, return prop
    if (!(prop && typeof prop === 'object')) return prop

    // Has an active breakpoint key, return that value
    if (activeBreakpoint && prop[activeBreakpoint]) return prop[activeBreakpoint]

    const possibleBreakpoints = Object.keys(prop)

    // Has only one key, return that value
    if (possibleBreakpoints.length === 0) return prop[possibleBreakpoints[0]]

    // Return closest breakpoint
    const indexOfActiveBreakpoint = breakpointEntries.findIndex(([key]) => key === activeBreakpoint)
    const valueOfActiveBreakpoint = breakpointEntries[indexOfActiveBreakpoint][1]

    let closestBreakpointValueDiff = Infinity
    let closestBreakpointName = null

    for (const possibleBreakpointName of possibleBreakpoints) {
      const possibleBreakpointEntry = breakpointEntries.find(([key]) => key === possibleBreakpointName)

      if (!possibleBreakpointEntry) continue

      const possibleBreakpointValue = possibleBreakpointEntry[1]

      if (possibleBreakpointValue < valueOfActiveBreakpoint && valueOfActiveBreakpoint - possibleBreakpointValue < closestBreakpointValueDiff) {
        closestBreakpointValueDiff = valueOfActiveBreakpoint - possibleBreakpointValue
        closestBreakpointName = possibleBreakpointName
      }
    }

    if (closestBreakpointName !== null) return prop[closestBreakpointName]

    // Return first breakpoint
    return prop[possibleBreakpoints[0]]
  }, [prop, activeBreakpoint, breakpointEntries])

  const [closest, setClosest] = useState(getClosestValue())

  useEffect(() => {
    function handleResize() {
      setActiveBreakpoint(getActiveBreakpoint())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [getActiveBreakpoint])

  useEffect(() => {
    setClosest(getClosestValue())
  }, [getClosestValue])

  return closest
}

export default usePropWithBreakpoints
