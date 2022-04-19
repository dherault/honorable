import {
  HonorableTheme,
  StyleProps,
} from '../types'

import filterObject from './filterObject'

function createMediaQuery(key: string, value: any, breakpoint: number): null | [string, { [key: string]: any }] {
  if (typeof breakpoint !== 'number') return null

  return [
    `@media (max-width: ${breakpoint}px)`,
    {
      [key]: value,
    },
  ]
}

function resolveBreakpoints(styleProps: StyleProps, theme: HonorableTheme) {
  const breakpoints = Object.keys(filterObject(theme.breakpoints))

  return Object.entries(styleProps).reduce((acc, [key, value]) => {
    for (const breakpointName of breakpoints) {
      if (key.endsWith(`-${breakpointName}`)) {
        const entry = createMediaQuery(key.slice(0, -breakpointName.length - 1), value, theme.breakpoints[breakpointName])

        if (!entry) return acc

        return {
          ...acc,
          [entry[0]]: {
            ...acc[entry[0]],
            ...entry[1],
          },
        }
      }
    }

    return {
      ...acc,
      [key]: value,
    }
  }, {})
}

export default resolveBreakpoints
