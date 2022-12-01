function filterUndefinedValues(object: object): object {
  return Object.keys(object).reduce((accumulator, key) => {
    if (typeof object[key] !== 'undefined') accumulator[key] = object[key]

    return accumulator
  }, {})
}

export default filterUndefinedValues
