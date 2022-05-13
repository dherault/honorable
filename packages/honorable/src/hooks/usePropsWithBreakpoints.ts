import filterObject from '../utils/filterObject'

import useTheme from './useTheme'

function usePropsWithBreakpoints(props: object) {
  const theme = useTheme()

  const breakpointKeys = Object.keys(filterObject(theme.breakpoints)).map(b => `-${b}`)

  if (!breakpointKeys.length) return props

  return Object.keys(props).reduce((accumulator, key) => {
    const foundBreakpoint = breakpointKeys.find(b => key.endsWith(b))

    if (foundBreakpoint) {
      accumulator[key.slice(0, -foundBreakpoint.length)] = props[key]
    }
    else if (!accumulator[key]) {
      accumulator[key] = props[key]
    }

    return accumulator
  }, {})
}

export default usePropsWithBreakpoints
