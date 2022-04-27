import {
  CustomProps,
  HonorableTheme,
  StylesProps,
} from '../types'

import filterObject from './filterObject'

// Return the style object of applied customProps
function resolveCustomProps(customProps: CustomProps, props: object = {}, theme: HonorableTheme = {}): StylesProps {
  const resolvedStyles = {}

  if (!(customProps && customProps instanceof Map)) return resolvedStyles

  customProps.forEach((styles, fn) => {
    if (typeof fn === 'function' && fn(props, theme)) {
      if (typeof styles === 'function') Object.assign(resolvedStyles, styles(props, theme))
      else Object.assign(resolvedStyles, filterObject(styles))
    }
  })

  return resolvedStyles
}

export default resolveCustomProps
