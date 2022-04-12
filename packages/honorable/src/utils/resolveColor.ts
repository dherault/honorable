import { StyleProps, Theme } from '../types'

import namedColors from '../data/namedColors'

import isSelector from './isSelector'
import { darken, lighten } from './lightenAndDarken'
import transparencify from './transparencify'

/*
  resolveColor
  ------------
  Convert a css string containing color names and helper function to hex values.
  Works recursively on objects values.
*/

const colorProperties = [
  'backgroundColor',
  'background',
  'border',
  'borderBottom',
  'borderLeft',
  'borderRight',
  'borderTop',
  'borderColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderRightColor',
  'borderTopColor',
  'boxShadow',
  'caretColor',
  'color',
  'columnRule',
  'columnRuleColor',
  'filter',
  'opacity',
  'outlineColor',
  'outline',
  'textDecoration',
  'textDecorationColor',
  'textShadow',
]

function resolveColor(key: string | null, value: string | number | StyleProps, theme: Theme = {}): string | number | StyleProps {
  if (!(!key || isSelector(key) || colorProperties.includes(key))) return value

  if (typeof value === 'object') {
    const resolvedObject = {}

    Object.keys(value).forEach(key => {
      resolvedObject[key] = resolveColor(key, value[key], theme)
    })

    return resolvedObject
  }

  if (typeof value !== 'string') return value

  return applyColorHelpers(convertThemeColors(value, theme))
}

/*
  convertThemeColors
  ------------
  Convert a named theme color to its hex value according to mode.
  eg: "primary" => "#0070f3"
*/

function convertThemeColors(value: string, theme: Theme) {
  let converted = value

  Object.keys(theme.colors || {})
  .sort((a, b) => b.length - a.length)
  .forEach(themeColorName => {
    if (themeColorName && converted.includes(themeColorName)) {
      converted = converted.replace(
        new RegExp(themeColorName, 'g'),
        resolveThemeColor(themeColorName, theme)
      )
    }
  })

  return converted
}

function resolveThemeColor(color: string, theme: Theme, previousColor: string = '', i = 0): string {
  if (i >= 64) {
    throw new Error('Could not resolve color, you may have a circular color reference in your theme.')
  }

  const foundColor = typeof theme.colors[color] === 'string'
    ? theme.colors[color]
    : typeof theme.colors[color] === 'object'
      ? theme.colors[color][theme.mode]
      : color

  return foundColor === previousColor ? foundColor : resolveThemeColor(foundColor, theme, foundColor, i + 1)
}

/*
  applyColorHelpers
  ------------
  Apply color helpers to a CSS string value.
  eg: "lighten(primary, 33)" => "#0070f3"
  Do it recursively to support nested color helpers.
*/

const colorHelpers = [
  {
    name: 'lighten',
    regex: /lighten\s*\(\s*([^(),]*),?\s*([0-9]*)?\s*\)/g,
    fn: (color: string, intensity: number) => lighten(color, intensity),
  },
  {
    name: 'darken',
    regex: /darken\s*\(\s*([^(),]*),?\s*([0-9]*)?\s*\)/g,
    fn: (color: string, intensity: number) => darken(color, intensity),
  },
  {
    name: 'transparencify',
    regex: /transparencify\s*\(\s*([^(),]*),?\s*([0-9]*)?\s*\)/g,
    fn: (color: string, intensity: number) => transparencify(color, intensity),
  },
]

function applyColorHelpers(colorString: string, i = 0): string {
  if (i >= 64) {
    throw new Error('Could not apply color helper.')
  }

  const appliedColor = colorHelpers.reduce((colorString, { regex, fn, name }) => {
    if (colorString.includes(name)) {
      return colorString.replace(
        regex,
        (_match, color, intensityString) => {
          let intensity = intensityString ? parseInt(intensityString) : undefined

          if (intensity !== intensity) intensity = undefined

          return fn(convertNamedColor(color.trim()), intensity)
        }
      )
    }

    return colorString
  }, colorString)

  return appliedColor === colorString ? appliedColor : applyColorHelpers(appliedColor, i + 1)
}

/*
  convertNamedColors
  ------------
  Convert a named CSS color to its hex value.
  eg: "red" => "#ff0000"
  Needed for applying helper functions on CSS colors
*/

function convertNamedColor(value: string) {
  return namedColors[value] || value
}

export default resolveColor
