import { StyleProps, Theme } from '../types'

import namedColors from '../data/namedColors'

import isSelector from './isSelector'
import { darken, lighten } from './lightenAndDarken'
import transparencify from './transparencify'

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

  return applyColorHelpers(convertNamedColor(convertThemeColors(value, theme)))
}

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

const namedColorReplacers = Object.entries(namedColors).map(([colorName, colorHex]) => ({
  colorName,
  colorHex,
  regex: new RegExp(colorName, 'g'),
  replacer: (value: string, regex: RegExp) => value.replace(regex, colorHex),
}))
.sort((a, b) => b.colorName.length - a.colorName.length)

function convertNamedColor(value: string) {
  let converted = value

  namedColorReplacers.forEach(({ regex, replacer, colorName }) => {
    if (converted.includes(colorName)) {
      converted = replacer(converted, regex)
    }
  })

  return converted
}

const colorHelpers = [
  {
    regex: /lighten\s*\(\s*([^(),]*),?\s*([0-9]*)?\s*\)/g,
    fn: (color: string, intensity: number) => lighten(color, intensity),
  },
  {
    regex: /darken\s*\(\s*([^(),]*),?\s*([0-9]*)?\s*\)/g,
    fn: (color: string, intensity: number) => darken(color, intensity),
  },
  {
    regex: /transparencify\s*\(\s*([^(),]*),?\s*([0-9]*)?\s*\)/g,
    fn: (color: string, intensity: number) => transparencify(color, intensity),
  },
]

function applyColorHelpers(colorString: string, i = 0): string {
  if (i >= 64) {
    throw new Error('Could not apply color helper.')
  }

  const appliedColor = colorHelpers.reduce((color, helper) => (
    color.replace(
      helper.regex,
      (_match, color, intensityString) => {
        let intensity = intensityString ? parseInt(intensityString) : undefined

        if (intensity !== intensity) intensity = undefined

        return helper.fn(color.trim(), intensity)
      }
    )
  ), colorString)

  return appliedColor === colorString ? appliedColor : applyColorHelpers(appliedColor, i + 1)
}

export default resolveColor
