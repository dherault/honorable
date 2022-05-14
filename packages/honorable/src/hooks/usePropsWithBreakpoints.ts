import { useCallback, useEffect, useMemo, useState } from 'react'

import filterObject from '../utils/filterObject'

import useTheme from './useTheme'

function usePropsWithBreakpoints(props: object) {
  const theme = useTheme()
  const [chosenProps, setChosenProps] = useState(props)

  const breakpointKeys = useMemo(() => Object.keys(filterObject(theme.breakpoints)), [theme])

  const handleMediaChange = useCallback((breakpoint: string, event: any) => {

  }, [])

  useEffect(() => {
    if (!breakpointKeys.length) return

    const mediaQueries = breakpointKeys.map(key =>
  })

  // return Object.keys(props).reduce((accumulator, key) => {
  //   const foundBreakpoint = breakpointKeys.find(b => key.endsWith(b))

  //   // THIS IS NONSENSE
  //   if (foundBreakpoint) {
  //     accumulator[key.slice(0, -foundBreakpoint.length)] = props[key]
  //   }
  //   else if (!accumulator[key]) {
  //     accumulator[key] = props[key]
  //   }

  //   return accumulator
  // }, {})

  return chosenProps
}

export default usePropsWithBreakpoints
