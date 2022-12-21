import { HonorableTheme } from '../types'

import namedColors from '../data/namedColors'

import reduceDeep from '../utils/reduceDeep'
import isSelector from '../utils/isSelector'
import { darken, lighten } from '../utils/lightenAndDarken'
import transparency from '../utils/transparency'
import filterObject from '../utils/filterObject'

/*
  resolveColor
  ------------
  Convert a css string containing color names and helper function to hex values.
  Works recursively on objects values.
*/

const colorProperties = [
  'background',
  'backgroundColor',
  'border',
  'borderBottom',
  'borderBottomColor',
  'borderColor',
  'borderLeft',
  'borderLeftColor',
  'borderRight',
  'borderRightColor',
  'borderTop',
  'borderTopColor',
  'boxShadow',
  'caretColor',
  'color',
  'columnRule',
  'columnRuleColor',
  'fill',
  'filter',
  'opacity',
  'outline',
  'outlineColor',
  'stroke',
  'textDecoration',
  'textDecorationColor',
  'textShadow',
]

export default function resolveColor<T>(value: T, theme: HonorableTheme = {}): T {
  return resolveColorEntry(null, value, theme)
}

function resolveColorEntry(key: string | null, value: any, theme: HonorableTheme = {}): any {
  if (key && !(isSelector(key) || colorProperties.includes(key))) return value

  if (value && typeof value === 'object') {
    return reduceDeep(value, (accumulator, key, value) => {
      accumulator[key] = resolveColorEntry(key, value, theme)

      return accumulator
    })
  }

  if (typeof value === 'string') return resolveColorString(value, theme)

  return value
}

export function resolveColorString(value: string, theme: HonorableTheme = {}): string {
  if (!theme.cache) theme.cache = {}
  if (!theme.cache[theme.mode ?? 'light']) theme.cache[theme.mode ?? 'light'] = {}
  if (theme.cache[theme.mode ?? 'light'][value]) return theme.cache[theme.mode ?? 'light'][value]

  const colors = Object.entries(filterObject(theme.colors ?? {})).reduce<Record<string, string>>((accumulator, [key, value]) => {
    if (typeof value === 'object') {
      return {
        ...accumulator,
        [key]: value,
        ...reduceObjectToJsonPathsObject(key, value),
      }
    }

    accumulator[key] = value

    return accumulator
  }, {})

  return theme.cache[theme.mode ?? 'light'][value] = applyColorHelpers(convertThemeColors(value, colors, theme))
}

function reduceObjectToJsonPathsObject(key: string, value: any) {
  const object: Record<string, any> = {}

  Object.entries(value).forEach(([k, v]) => {
    const nextKey = `${key}.${k}`

    if (typeof v === 'object') {
      Object.assign(object, reduceObjectToJsonPathsObject(nextKey, v))

      return
    }

    object[nextKey] = v
  })

  return object
}

/*
  convertThemeColors
  ------------
  Convert a named theme color to its hex value according to mode.
  eg: "primary" => "#0070f3"
*/

function convertThemeColors(value: string, colors: Record<string, string>, theme: HonorableTheme, i = 0): string {
  if (i >= 64) {
    throw new Error('Could not convert color, you may have a circular color reference in your theme.')
  }

  let converted = value

  Object.keys(colors)
  .sort((a, b) => b.length - a.length)
  .forEach(themeColorName => {
    if (themeColorName && converted.includes(themeColorName)) {
      const themeColor = resolveThemeColor(themeColorName, colors, theme)

      if (typeof themeColor === 'string' && themeColor.length > 0) {
        converted = converted.replaceAll(themeColorName, themeColor)
      }
    }
  })

  return converted === value ? converted : convertThemeColors(converted, colors, theme, i + 1)
}

function resolveThemeColor(color: string, colors: Record<string, string>, theme: HonorableTheme, i = 0): string {
  if (i >= 64) {
    throw new Error('Could not resolve color, you may have a circular color reference in your theme.')
  }

  const foundColor = typeof colors[color] === 'string'
    ? colors[color]
    : typeof colors[color] === 'object'
      // @ts-expect-error
      ? (colors[color][theme.mode ?? 'light'] as string)
      : color

  return foundColor === color ? foundColor : resolveThemeColor(foundColor, colors, theme, i + 1)
}

/*
  applyColorHelpers
  ------------
  Apply color helpers to a CSS string value.
  eg: "lighten(primary, 33)" => "#0070f3"
  Do it recursively to support nested color helpers.
*/

// For regex testing-purposes
/*
lighten(#000000, 10)
lighten(#000000)
lighten(rgb(0, 0, 0))
lighten(rgb(0, 0, 0), 10)
lighten(rgba(0, 0, 0, 50))
lighten(rgba(0, 0, 0, 50), 10)
lighten(rgb(0,0,0))
lighten(rgb(0,0,0), 10)
lighten(rgba(0,0,0,50))
lighten(rgba(0,0,0,50), 10)
lighten(rgb( 0 , 0 , 0 ))
lighten(rgb(0 , 0 , 0 ) , 10)
lighten(rgba( 0 , 0, 0 , 50 ) )
lighten(rgba(0, 0 , 0, 50 ), 10 )
*/
const colorHelpers = [
  {
    name: 'lighten',
    regex: /lighten\s*\(\s*(rgba?\s*\([^)]+\)|[^,)]+)(?:\s*,\s*)?([^)\s]*)\s*\)/g,
    fn: (color: string, intensity?: number) => lighten(color, intensity),
  },
  {
    name: 'darken',
    regex: /darken\s*\(\s*(rgba?\s*\([^)]+\)|[^,)]+)(?:\s*,\s*)?([^)\s]*)\s*\)/g,
    fn: (color: string, intensity?: number) => darken(color, intensity),
  },
  {
    name: 'transparency',
    regex: /transparency\s*\(\s*(rgba?\s*\([^)]+\)|[^,)]+)(?:\s*,\s*)?([^)\s]*)\s*\)/g,
    fn: (color: string, intensity?: number) => transparency(color, intensity),
  },
]

function applyColorHelpers(colorString: string, i = 0): string {
  if (i >= 64) {
    throw new Error('Could not apply color helper. Too many recursions.')
  }

  const appliedColor = colorHelpers.reduce((colorString, { regex, fn, name }) => {
    if (colorString.includes(name)) {
      return colorString.replace(
        regex,
        (_match, color, intensityString) => {
          let intensity = intensityString ? parseInt(intensityString) : undefined

          if (intensity !== intensity) intensity = undefined

          // Might be useful to do color.replaceAll(' ', '')
          return fn(convertRgbColor(convertNamedColor(color.trim())), intensity)
        }
      )
    }

    return colorString
  }, colorString)

  return appliedColor === colorString ? appliedColor : applyColorHelpers(appliedColor, i + 1)
}

/*
  convertRgbColor
  ------------
  Convert a named CSS color function to its hex value.
  eg: "rgb(255, 0, 0)" => "#ff0000"
  Needed for applying helper functions on CSS colors
*/

const rgbRegexp = /rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,?\s*?(\d{1,3})?\s*\)/

function convertRgbColor(value: string) {
  if (value.includes('rgb')) {
    const match = value.match(rgbRegexp)

    if (match) {
      const alpha = parseInt(match[4])

      return `#${parseInt(match[1]).toString(16).padEnd(2, '0')}${parseInt(match[2]).toString(16).padEnd(2, '0')}${parseInt(match[3]).toString(16).padEnd(2, '0')}${alpha === alpha ? alpha.toString(16).padEnd(2, '0') : ''}`
    }
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
  return namedColors[value as keyof typeof namedColors] || value
}
