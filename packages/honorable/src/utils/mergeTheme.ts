import mergeWith from 'lodash.mergewith'

import { HonorableTheme } from '../types'

import defaultTheme from '../data/defaultTheme'

function customizer(target: any, source: any) {
  if (Array.isArray(target)) {
    return [...target, ...source]
  }
}

function mergeTheme(...themes: HonorableTheme[]): HonorableTheme {
  return mergeWith({}, defaultTheme, ...themes, customizer)
}

export default mergeTheme
