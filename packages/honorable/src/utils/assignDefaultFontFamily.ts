const defaultFontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

function assignDefaultFontFamily(object: any) {
  if (!object.fontFamily) object.fontFamily = defaultFontFamily
  else object.fontFamily = `${object.fontFamily}, ${defaultFontFamily}`

  return object
}

export default assignDefaultFontFamily
