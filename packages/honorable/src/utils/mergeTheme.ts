import mergeWith from 'lodash.mergewith'

import { HonorableTheme } from '../types.js'

function customizer(target: any, source: any) {
  if (Array.isArray(target)) {
    return [...target, ...source]
  }
}

function mergeTheme(...themes: HonorableTheme[]): HonorableTheme {
  return mergeWith({}, ...themes, customizer)
}

export default mergeTheme
