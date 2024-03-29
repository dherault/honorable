import { useCallback, useEffect, useState } from 'react'

import createMediaQuery from '../utils/createMediaQuery.js'

import useTheme from './useTheme.js'

// useMediaQuery('(min-width:600px)')
// useMediaQuery('up', 600)
// useMediaQuery('up', 'mobile')
// useMediaQuery('down', 'tablet')
// useMediaQuery('between', 'mobile', 'tablet')

function useMediaQuery(upOrDownOrBetweenOrOnlyOrNotOrQuery: 'up' | 'down' | 'between' | 'only' | 'not' | string, breakpoint1?: string | number, breakpoint2?: string | number): boolean {
  const theme = useTheme()

  const isMatched = useCallback(() => {
    const mediaQuery = createMediaQuery(theme, upOrDownOrBetweenOrOnlyOrNotOrQuery, breakpoint1, breakpoint2)

    if (!mediaQuery) return false

    return window.matchMedia(mediaQuery).matches
  }, [theme, upOrDownOrBetweenOrOnlyOrNotOrQuery, breakpoint1, breakpoint2])

  const [matched, setMatched] = useState(isMatched())

  const handler = useCallback(() => {
    setMatched(isMatched())
  }, [isMatched])

  useEffect(() => {
    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [handler])

  return matched
}

export default useMediaQuery
