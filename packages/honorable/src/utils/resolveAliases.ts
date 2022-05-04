import { HonorableTheme } from '../types'

import reduceDeep from './reduceDeep'

function resolveAliases(props: object, theme: HonorableTheme): object {
  const { aliases } = theme

  if (!(aliases && typeof aliases === 'object')) return props

  return reduceDeep(props, (acc, key, value) => ({
    ...acc,
    [aliases[key] ?? key]: value,
  }))
}

export default resolveAliases
