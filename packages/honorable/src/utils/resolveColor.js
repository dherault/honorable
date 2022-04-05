function resolveColor(value, theme) {
  if (typeof value === 'object') {
    const resolvedObject = {}

    Object.keys(value).forEach(key => {
      resolvedObject[key] = resolveColor(value[key], theme)
    })

    return resolvedObject
  }

  if (typeof value !== 'string') {
    return value
  }

  const namedColors = Object.keys(theme.colors || {}).sort((a, b) => b.length - a.length)

  let resolvedValue = value

  namedColors.forEach(colorName => {
    if (resolvedValue.includes(colorName)) {
      resolvedValue = resolvedValue.replace(
        colorName,
        typeof theme.colors[colorName] === 'string'
          ? theme.colors[colorName]
          : typeof theme.colors[colorName] === 'object'
            ? theme.colors[colorName][theme.mode]
            : colorName
      )
    }
  })

  return resolvedValue
}

export default resolveColor
