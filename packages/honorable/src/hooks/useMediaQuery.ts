import { useCallback, useEffect, useState } from 'react'

import useTheme from './useTheme'

// useMediaQuery('(min-width:600px)')
// useMediaQuery('up', 600)
// useMediaQuery('up', 'mobile')
// useMediaQuery('down', 'tablet')
// useMediaQuery('between', 'mobile', 'tablet')

function useMediaQuery(upOrDownOrBetweenOrQuery: 'up' | 'down' | 'between' | string, breakpoint1?: string | number, breakpoint2?: string | number): boolean {
  const theme = useTheme()

  const createBetweenMediaQuery = useCallback(() => {
    const { breakpoints } = theme
    const breakpoint1Value = typeof breakpoint1 === 'string' ? breakpoints[breakpoint1] : breakpoint1 || 0
    const breakpoint2Value = typeof breakpoint2 === 'string' ? breakpoints[breakpoint2] : breakpoint2 || 0
    const min = breakpoint1Value < breakpoint2Value ? breakpoint1Value : breakpoint2Value
    const max = breakpoint1Value > breakpoint2Value ? breakpoint1Value : breakpoint2Value

    return `(min-width: ${min}px) and (max-width: ${max}px)`
  }, [theme, breakpoint1, breakpoint2])

  const isMatched = useCallback(() => {
    const { breakpoints } = theme
    const breakpoint1Value = typeof breakpoint1 === 'string' ? breakpoints[breakpoint1] : breakpoint1 || 0
    const up = upOrDownOrBetweenOrQuery === 'up'
    const down = upOrDownOrBetweenOrQuery === 'down'
    const between = upOrDownOrBetweenOrQuery === 'between'
    const other = !(up || down || between) && typeof upOrDownOrBetweenOrQuery === 'string'

    return (
      up && window.matchMedia(`(min-width: ${breakpoint1Value}px)`).matches
      || (down && window.matchMedia(`(max-width: ${breakpoint1Value}px)`).matches)
      || (between && window.matchMedia(createBetweenMediaQuery()).matches)
      || (other && window.matchMedia(upOrDownOrBetweenOrQuery).matches)
    )
  }, [theme, upOrDownOrBetweenOrQuery, breakpoint1, createBetweenMediaQuery])

  const [matched, setMatched] = useState(isMatched())

  const handler = useCallback(() => {
    setMatched(isMatched())
  }, [isMatched])

  useEffect(() => {
    document.addEventListener('resize', handler)

    return () => {
      document.removeEventListener('resize', handler)
    }
  }, [handler])

  return matched
}

export default useMediaQuery
