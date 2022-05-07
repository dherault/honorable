import merge from 'lodash.merge'

import { DefaultStyles, HonorableTheme } from '../types'

import filterObject from '../utils/filterObject'

function resolveDefaultStyles(defaultStyles: DefaultStyles, props: object, theme: HonorableTheme): object {
  if (Array.isArray(defaultStyles)) {
    // We use merge here because some style props are deeply nested objects
    return defaultStyles.reduce((acc, x) => merge(acc, filterObject(typeof x === 'function' ? x(props, theme) : x)), {})
  }

  return {}
}

export default resolveDefaultStyles
