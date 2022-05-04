import { HonorableTheme } from '../types'

function createMediaQuery(breakpointName: string, upOrDownOrExact: 'up' | 'down' |'exact', theme: HonorableTheme) {
  if (typeof theme.breakpoints?.[breakpointName] !== 'number') {
    return null
  }

  const breakpointEntries = Object.entries(theme.breakpoints).sort(([, valueA], [, valueB]) => valueA - valueB)
  const index = breakpointEntries.findIndex(([key]) => key === breakpointName)

  switch (upOrDownOrExact) {
    case 'up': {
      return `@media (min-width: ${breakpointEntries[index][1]}px)`
    }
    case 'down': {
      return `@media (max-width: ${breakpointEntries[index][1]}px)`
    }
    case 'exact': {
      const mediaQuery = `@media (min-width: ${breakpointEntries[index][1]}px`
      const nextEntry = breakpointEntries[index + 1]

      if (!nextEntry) return `${mediaQuery})`

      return `${mediaQuery} and max-width: ${nextEntry[1]}px)`
    }
    default: {
      return null
    }
  }
}

export default createMediaQuery
