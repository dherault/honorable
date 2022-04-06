const selectorPrefixes = [':', '&', '>', '~', '+', '.', ',', '#']

function isSelector(property) {
  if (typeof property !== 'string') return false

  const trimmedProperty = property.trim()

  return property.startsWith(' ') || selectorPrefixes.some(prefix => trimmedProperty.startsWith(prefix))
}
export default isSelector
