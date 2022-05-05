type ReducerType = (accumulator: any, key: string, value: any, object: object) => any

function reduceDeep(object: object, reducer: ReducerType): object {
  return Object.entries(object).reduce((accumulator, [key, value]) => {
    if (value && typeof value === 'object') {
      accumulator[key] = reduceDeep(value, reducer)

      return accumulator
    }

    return reducer(accumulator, key, value, object)
  }, {})
}

export default reduceDeep
