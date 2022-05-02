import merge from 'lodash.merge'

import { HonorableTheme } from '../types'

import defaultTheme from '../data/defaultTheme'

function mergeTheme(...themes: HonorableTheme[]): HonorableTheme {
  return merge({}, defaultTheme, ...themes)
}

export default mergeTheme
