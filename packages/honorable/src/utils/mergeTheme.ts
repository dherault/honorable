import mergeWith from 'lodash.mergewith'

import { HonorableTheme } from '../types'

import defaultTheme from '../data/defaultTheme'

function customizer(target: any, source: any) {
  if (target instanceof Map && source instanceof Map) {
    return new Map([...target.entries(), ...source.entries()])
  }
}

function mergeTheme(...themes: HonorableTheme[]): HonorableTheme {
  return mergeWith({}, defaultTheme, ...themes, customizer)
}

export default mergeTheme
