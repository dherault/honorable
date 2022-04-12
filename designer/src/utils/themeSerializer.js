const functionPrefix = '_@@@HONORABLE@@@FUNCTION@@@_'

function convertToFunction(fnString) {
  try {
    return eval(fnString)
  }
  catch (error) {
    return `ERROR: ${fnString}`
  }
}

function themeReplacer(key, value) {
  if (value instanceof Map) {
    const mapLikeObject = {}

    value.forEach((value, key) => {
      mapLikeObject[functionPrefix + (key?.stringValue || key || '')] = value
    })

    return mapLikeObject
  }

  return value
}

function themeReviver(key, value) {
  if (typeof value === 'object' && Object.keys(value).some(x => x.startsWith(functionPrefix))) {
    return new Map(Object.entries(value).map(([key, value]) => [convertToFunction(key.replace(functionPrefix, '')), value]))
  }

  return value
}

export function serializeTheme(theme) {
  return JSON.stringify(theme, themeReplacer, 2)
}

export function deserializeTheme(themeJson) {
  return JSON.parse(themeJson, themeReviver)
}
