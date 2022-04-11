const customPropsSerializationPrefix = '@@@CUSTOM@@@'

function applyPrefix(object) {
  if (typeof object !== 'object') return

  return Object.fromEntries(Object.entries(object).map(([key, value]) => [customPropsSerializationPrefix + key, value]))
}

function themeReplacer(key, value) {
  if (key === 'customProps') {
    return applyPrefix(value)
  }

  if (value instanceof Map) {
    const mapLikeObject = {}

    value.forEach((value, key) => {
      mapLikeObject[JSON.stringify(key)] = value
    })

    return mapLikeObject
  }

  return value
}

function themeReviver(key, value) {
  if (key.startsWith(customPropsSerializationPrefix)) {
    const mapValue = new Map()

    Object.entries(value).forEach(([key, value]) => {
      mapValue.set(JSON.parse(key), value)
    })

    return mapValue
  }

  return value
}

function removePrefixes(theme) {
  if (typeof theme !== 'object' || theme instanceof Map) return theme

  const nextTheme = {}

  Object.entries(theme).forEach(([key, value]) => {
    nextTheme[key.startsWith(customPropsSerializationPrefix) ? key.slice(customPropsSerializationPrefix.length) : key] = removePrefixes(value)
  })

  return nextTheme
}

export function serializeTheme(theme) {
  return JSON.stringify(theme, themeReplacer)
}

export function deserializeTheme(themeJson) {
  return removePrefixes(JSON.parse(themeJson, themeReviver))
}
