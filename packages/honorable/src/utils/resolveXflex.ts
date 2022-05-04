import fp from 'flexpad'

import reduceDeep from './reduceDeep'

function resolveXflex(props: object) {
  return reduceDeep(props, (accumulator, key, value) => ({
    ...accumulator,
    ...(key === 'xflex' ? fp(value) : { [key]: value }),
  }))
}

export default resolveXflex
