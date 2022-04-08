function filterObject(any) {
  return any && typeof any === 'object' ? any : {}
}

export default filterObject
