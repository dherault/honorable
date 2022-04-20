import { HonorableTheme } from '../types'

function isMediaQueryKey(key: any) {
  return key === 'mobile' || key === 'tablet' || key === 'desktop'
}

function pixelify(value: number | string): string {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

function createMediaQuery(breakpointName: string, theme: HonorableTheme) {
  if (!isMediaQueryKey(breakpointName)) {
    return null
  }

  switch (breakpointName) {
    case 'mobile': {
      return `@media (max-width: ${pixelify(theme.breakpoints?.mobile)})`
    }
    case 'tablet': {
      return `@media (min-width: ${pixelify(theme.breakpoints?.mobile)}) and (max-width: ${pixelify(theme.breakpoints?.tablet)})`
    }
    case 'desktop': {
      if (theme.breakpoints?.desktop === Infinity) {
        return `@media (min-width: ${pixelify(theme.breakpoints?.tablet)})`
      }

      return `@media (min-width: ${pixelify(theme.breakpoints?.tablet)} and max-width: ${pixelify(theme.breakpoints?.desktop)})`
    }
  }
}

export default createMediaQuery
