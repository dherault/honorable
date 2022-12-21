// Filter out non-object types
function filterObject<T extends object>(any: T): T {
  return any && typeof any === 'object' ? any : ({} as T)
}

export default filterObject
