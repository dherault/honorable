import isSelector from './isSelector'

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

function resolveColor(key, value, theme = {}) {
  if (!(!key || isSelector(key) || colorProperties.includes(key))) return value

  if (typeof value === 'object' && !isSelector(key)) {
    const resolvedObject = {}

    Object.keys(value).forEach(key => {
      resolvedObject[key] = resolveColor(key, value[key], theme)
    })

    return resolvedObject
  }

  let resolvedValue = value

  Object.keys(theme.colors || {})
  .sort((a, b) => b.length - a.length)
  .forEach(colorName => {
    if (resolvedValue.includes(colorName)) {
      resolvedValue = resolvedValue.replace(
        colorName,
        getColor(colorName, theme)
      )
    }
  })

  return resolvedValue
}

function getColor(color, theme, previousColor, i = 0) {
  if (i >= 128) {
    throw new Error('Could not resolve color, you may have a circular color reference in your theme.')
  }

  const foundColor = typeof theme.colors[color] === 'string'
    ? theme.colors[color]
    : typeof theme.colors[color] === 'object'
      ? theme.colors[color][theme.mode]
      : color

  return foundColor === previousColor ? foundColor : getColor(foundColor, theme, foundColor, i + 1)
}

export default resolveColor
