import mergeWith from 'lodash.mergewith'

import { Theme } from '../types'

function customizer(target: any, source: any) {
  if (target instanceof Map && source instanceof Map) {
    return new Map([...target.entries(), ...source.entries()])
  }
}

function mergeTheme(...themes: Theme[]): Theme {
  return mergeWith({}, ...themes, customizer)
}

export default mergeTheme
