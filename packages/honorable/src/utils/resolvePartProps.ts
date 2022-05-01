import { HonorableTheme, StylesProps } from '../types'

import resolveDefaultProps from '../utils/resolveDefaultProps'

// Return the style object of applied partProps
function resolvePartProps(name: string, partKey: string, props: object, honorableOverridenProps: object, theme: HonorableTheme): StylesProps {
  const componentTheme = theme[name]

  if (!(componentTheme && typeof componentTheme === 'object')) return {}

  const partTheme = componentTheme.partProps?.[partKey]

  if (!partTheme) return {}

  return resolveDefaultProps(partTheme, { ...props, ...honorableOverridenProps }, theme)
}

export default resolvePartProps
