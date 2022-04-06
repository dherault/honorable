const selectorPrefixes = [':', '&', '>', '~', '+', '.', ',', '#']

function isSelector(property) {
  const trimmedProperty = property.trim()

  return property.startsWith(' ') || selectorPrefixes.some(prefix => trimmedProperty.startsWith(prefix))
}
export default isSelector
