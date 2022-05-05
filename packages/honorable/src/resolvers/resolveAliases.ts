import { HonorableTheme } from '../types'

import reduceDeep from '../utils/reduceDeep'

function resolveAliases(props: object, theme: HonorableTheme): object {
  const { aliases } = theme

  if (!(aliases && typeof aliases === 'object')) return props

  return reduceDeep(props, (accumulator, key, value) => {
    accumulator[aliases[key] ?? key] = value

    return accumulator
  })
}

export default resolveAliases
