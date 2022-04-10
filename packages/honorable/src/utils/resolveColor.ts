import { StyleProps, Theme } from '../types'

import namedColors from '../data/namedColors'

import isSelector from './isSelector'
import { darken, lighten } from './lightenAndDarken'

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

  let resolvedValue = value

  Object.keys(theme.colors || {})
  .sort((a, b) => b.length - a.length)
  .forEach(colorName => {
    if (resolvedValue.includes(colorName)) {
      resolvedValue = applyColorHelpers(
        convertNamedColor(
          resolvedValue.replace(
            new RegExp(colorName, 'g'),
            getColor(colorName, theme)
          )
        )
      )
    }
  })

  return resolvedValue
}

function getColor(color: string, theme: Theme, previousColor: string = '', i = 0): string {
  if (i >= 64) {
    throw new Error('Could not resolve color, you may have a circular color reference in your theme.')
  }

  const foundColor = typeof theme.colors[color] === 'string'
    ? theme.colors[color]
    : typeof theme.colors[color] === 'object'
      ? theme.colors[color][theme.mode]
      : color

  return foundColor === previousColor ? foundColor : getColor(foundColor, theme, foundColor, i + 1)
}

const colorHelpers = [
  {
    regex: /lighten\s*\(\s*([^()]*)\s*\)/g,
    fn: (color: string) => lighten(color),
  },
  {
    regex: /darken\s*\(\s*([^()]*)\s*\)/g,
    fn: (color: string) => darken(color),
  },
]

function applyColorHelpers(colorString: string, i = 0): string {
  if (i >= 64) {
    throw new Error('Could not apply color helper.')
  }

  const appliedColor = colorHelpers.reduce((color, helper) => color.replace(helper.regex, (_match, color) => helper.fn(convertNamedColor(color.trim()))), colorString)

  return appliedColor === colorString ? appliedColor : applyColorHelpers(appliedColor, i + 1)
}

function convertNamedColor(namedColor: string) {
  return namedColors[namedColor.toLowerCase()] || namedColor
}

export default resolveColor
