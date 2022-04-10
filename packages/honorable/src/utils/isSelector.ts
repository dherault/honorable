const selectorPrefixes = [':', '&', '>', '~', '+', '.', ',', '#']

// TODO use a regex
function isSelector(property: any) {
  if (typeof property !== 'string') return false

  const trimmedProperty = property.trim()

  return property.startsWith(' ') || selectorPrefixes.some(prefix => trimmedProperty.startsWith(prefix))
}
export default isSelector
