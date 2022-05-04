import { HonorableTheme } from '../types'

import reduceDeep from './reduceDeep'
import filterObject from './filterObject'
import createMediaQuery from './createMediaQuery'

function resolveBreakpoints(props: object, theme: HonorableTheme): object {
  const breakpointKeys = Object.keys(filterObject(theme.breakpoints))
    .map(key => [`-${key}`, `-${key}-up`, `-${key}-down`])

  return reduceDeep(props, (accumulator, key, value) => {
    for (const breakpoints of breakpointKeys) {
      const breakpoint = breakpoints.find(breakpoint => key.endsWith(breakpoint))

      if (breakpoint) {
        const suffixArray = breakpoint.split('-')
        suffixArray.shift()
        const suffix = suffixArray[suffixArray.length - 1] === 'up' || suffixArray[suffixArray.length - 1] === 'down' ? (suffixArray.pop() as 'up' | 'down') : 'exact'
        const breakpointName = suffixArray.join('-')
        const query = createMediaQuery(breakpointName, suffix, theme)

        if (!query) return accumulator

        return {
          ...accumulator,
          [query]: {
            ...accumulator[query],
            [key.slice(0, -breakpoint.length)]: value,
          },
        }
      }
    }

    return {
      ...accumulator,
      [key]: value,
    }
  })
}

export default resolveBreakpoints
