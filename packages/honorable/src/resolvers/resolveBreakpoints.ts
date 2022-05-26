import { HonorableTheme } from '../types'

import reduceDeep from '../utils/reduceDeep'
import filterObject from '../utils/filterObject'
import createMediaQuery from '../utils/createMediaQuery'

function resolveBreakpoints(props: object, theme: HonorableTheme): object {
  const breakpointKeys = Object.keys(filterObject(theme.breakpoints))
    .map(key => [`-${key}`, `-${key}-up`, `-${key}-down`])

  return reduceDeep(props, (accumulator, key, value) => {
    for (const breakpoints of breakpointKeys) {
      const breakpoint = breakpoints.find(breakpoint => key.endsWith(breakpoint))

      if (breakpoint) {
        const suffixArray = breakpoint.split('-')
        suffixArray.shift()
        // TODO v1 'exact'
        const suffix = suffixArray[suffixArray.length - 1] === 'up' || suffixArray[suffixArray.length - 1] === 'down' ? (suffixArray.pop() as 'up' | 'down') : 'down'
        const breakpointName = suffixArray.join('-')
        const query = createMediaQuery(theme, suffix, breakpointName)

        if (!query) return accumulator

        return {
          ...accumulator,
          [`@media ${query}`]: {
            ...accumulator[`@media ${query}`],
            [key.slice(0, -breakpoint.length)]: value,
          },
        }
      }
    }

    accumulator[key] = value

    return accumulator
  })
}

export default resolveBreakpoints
