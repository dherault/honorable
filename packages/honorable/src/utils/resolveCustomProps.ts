import {
  CustomProps,
  StyleProps,
  Theme,
} from '../types'

// Return the style object of applied customProps
function resolveCustomProps(customProps: CustomProps, props: object = {}, theme: Theme = {}): StyleProps {
  const resolvedStyles = {}

  if (!(customProps && customProps instanceof Map)) return resolvedStyles

  customProps.forEach((styles, fn) => {
    try {
      if (typeof fn === 'function' && fn(props, theme)) {
        Object.assign(resolvedStyles, styles)
      }
    }
    catch (error) {
      //
    }
  })

  return resolvedStyles
}

export default resolveCustomProps
