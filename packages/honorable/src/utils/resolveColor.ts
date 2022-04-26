import { HonorableTheme } from '../types'

import namedColors from '../data/namedColors'

import isSelector from './isSelector'
import { darken, lighten } from './lightenAndDarken'
import transparency from './transparency'

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

// TODO v1 test that
function resolveColor<T>(value: T, theme: HonorableTheme = {}): T {
  return resolveColorEntry(null, value, theme)
}

function resolveColorEntry<T>(key: string | null, value: T, theme: HonorableTheme = {}): T {
  if (key && !(isSelector(key) || colorProperties.includes(key))) return value

  if (typeof value === 'object') {
    const resolvedObject = {} as T

    Object.keys(value).forEach(key => {
      resolvedObject[key] = resolveColorEntry(key, value[key], theme)
    })

    return resolvedObject
  }

  if (typeof value !== 'string') return value

  return applyColorHelpers(convertThemeColors(value, theme)) as any as T
}

/*
  convertThemeColors
  ------------
  Convert a named theme color to its hex value according to mode.
  eg: "primary" => "#0070f3"
*/

function convertThemeColors(value: string, theme: HonorableTheme) {
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

function resolveThemeColor(color: string, theme: HonorableTheme, previousColor = '', i = 0): string {
  if (i >= 64) {
    throw new Error('Could not resolve color, you may have a circular color reference in your theme.')
  }

  const foundColor = typeof theme.colors[color] === 'string'
    ? theme.colors[color]
    : typeof theme.colors[color] === 'object'
      ? theme.colors[color][theme.mode || 'light']
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
    regex: /lighten\(([\w()-,#]*)?\)/g,
    fn: (color: string, intensity: number) => lighten(color, intensity),
  },
  {
    name: 'darken',
    regex: /darken\(([\w()-,#]*)?\)/g,
    fn: (color: string, intensity: number) => darken(color, intensity),
  },
  {
    name: 'transparency',
    regex: /transparency\(([\w()-,#]*)?\)/g,
    fn: (color: string, intensity: number) => transparency(color, intensity),
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
        (_match, colorAndIntensityString) => {
          const intensityArray = colorAndIntensityString.split(',')

          let color = colorAndIntensityString
          let intensity = parseInt(intensityArray[intensityArray.length - 1])

          if (intensity === intensity) {
            intensityArray.pop()
            color = intensityArray.join(',')
          }
          else {
            intensity = undefined
          }

          return fn(convertCssColorFunctions(convertNamedColor(color)), intensity)
        }
      )
    }

    return colorString
  }, colorString.replaceAll(' ', ''))

  return appliedColor === colorString ? appliedColor : applyColorHelpers(appliedColor, i + 1)
}

/*
  convertCssColorFunctions
  ------------
  Convert a named CSS color function to its hex value.
  eg: "rgb(255, 0, 0)" => "#ff0000"
  Needed for applying helper functions on CSS colors
*/

function convertCssColorFunctions(value: string) {
  const match = value.match(/^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3}),?(\d{1,3})?\)$/)

  if (match) {
    const alpha = parseInt(match[4])

    return `#${parseInt(match[1]).toString(16).padEnd(2, '0')}${parseInt(match[2]).toString(16).padEnd(2, '0')}${parseInt(match[3]).toString(16).padEnd(2, '0')}${alpha === alpha ? alpha.toString(16).padEnd(2, '0') : ''}`
  }

  return value
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
