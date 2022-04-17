// UncCapitalize a string
function uncaptalize(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

export default uncaptalize
