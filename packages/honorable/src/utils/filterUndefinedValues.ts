function filterUndefinedValues(object: Record<string, any>): object {
  return Object.keys(object).reduce<Record<string, any>>((accumulator, key) => {
    if (typeof object[key] !== 'undefined') accumulator[key] = object[key]

    return accumulator
  }, {})
}

export default filterUndefinedValues
