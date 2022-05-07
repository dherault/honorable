import { DefaultProps, HonorableTheme } from '../types'

import filterObject from '../utils/filterObject'

function resolveDefaultProps(defaultProps: DefaultProps, theme: HonorableTheme) {
  if (Array.isArray(defaultProps)) {
    return defaultProps.reduce((accumulator, x) => ({
      ...accumulator,
      ...filterObject(typeof x === 'function' ? x(accumulator, theme) : x),
    }), {})
  }

  return {}
}

export default resolveDefaultProps
