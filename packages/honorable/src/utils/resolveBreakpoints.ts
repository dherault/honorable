import {
  HonorableTheme,
  StyleProps,
} from '../types'

import filterObject from './filterObject'
import createMediaQuery from './createMediaQuery'

function resolveBreakpoints(styleProps: StyleProps, theme: HonorableTheme) {
  const breakpoints = Object.keys(filterObject(theme.breakpoints))

  return Object.entries(styleProps).reduce((acc, [key, value]) => {
    for (const breakpointName of breakpoints) {
      if (key.endsWith(`-${breakpointName}`)) {
        const query = createMediaQuery(breakpointName, theme)

        if (!query) return acc

        return {
          ...acc,
          [query]: {
            ...acc[query],
            [key.slice(0, -breakpointName.length - 1)]: value,
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
