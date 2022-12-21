import merge from 'lodash.merge'

import { HonorableTheme, StylesArray } from '../types'

import filterObject from '../utils/filterObject'

function resolveStyles(stylesArray: StylesArray | undefined, props: object, theme: HonorableTheme): object {
  if (Array.isArray(stylesArray)) {
    // We use merge here because some style props are deeply nested objects
    return stylesArray.reduce((accumulator, x) => merge(accumulator, filterObject(typeof x === 'function' ? x(props, theme) : x)), {})
  }

  return {}
}

export default resolveStyles
