function filterObject(any: any): object {
  return any && typeof any === 'object' ? any : {}
}

export default filterObject
