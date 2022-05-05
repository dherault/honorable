import fp from 'flexpad'

import reduceDeep from '../utils/reduceDeep'

function resolveXflex(props: object) {
  return reduceDeep(props, (accumulator, key, value) => {
    if (key === 'xflex') {
      return {
        ...accumulator,
        ...fp(value),
      }
    }

    accumulator[key] = value

    return accumulator
  })
}

export default resolveXflex
