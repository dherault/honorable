import merge from 'lodash.merge'

import { DefaultProps, HonorableTheme } from '../types'

import filterObject from './filterObject'

function resolveDefaultProps(defaultProps: DefaultProps, props: object, theme: HonorableTheme): object {
  if (Array.isArray(defaultProps)) {
    // We use merge here because some style props are deeply nested objects
    return defaultProps.reduce((acc, x) => merge(acc, filterObject(typeof x === 'function' ? x(props, theme) : x)), {})
  }

  return {}
}

export default resolveDefaultProps
