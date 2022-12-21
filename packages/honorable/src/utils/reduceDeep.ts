type ReducerType = (accumulator: any, key: string, value: any, object: Record<string, any>) => any

function reduceDeep(object: Record<string, any>, reducer: ReducerType): Record<string, any> {
  return Object.entries(object).reduce<Record<string, any>>((accumulator, [key, value]) => {
    if (value && typeof value === 'object') {
      accumulator[key] = reduceDeep(value, reducer)

      return accumulator
    }

    return reducer(accumulator, key, value, object)
  }, {})
}

export default reduceDeep
