import { HonorableTheme } from '../types'

function resolveAliases<T>(anyProps: T, theme: HonorableTheme): T {
  const { aliases } = theme

  if (!(aliases && typeof aliases === 'object')) return anyProps

  return Object.entries(anyProps).reduce((acc, [key, value]) => {
    acc[aliases[key] && typeof aliases[key] === 'string' ? aliases[key] : key] = value

    return acc
  }, {}) as T
}

export default resolveAliases
