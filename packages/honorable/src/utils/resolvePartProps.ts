import {
  AnyProps,
  StyleProps,
  Theme,
} from '../types'

import resolveCustomProps from './resolveCustomProps'

// Return the style object of applied partProps
function resolvePartProps(componentKey: string, partKey: string, props: AnyProps, theme: Theme): StyleProps {
  const componentTheme = theme[componentKey]

  if (!(componentTheme && typeof componentTheme === 'object')) return {}

  return {
    ...componentTheme.partDefaultProps?.[partKey],
    ...resolveCustomProps(componentTheme.partCustomProps?.[partKey], props, theme),
  }
}

export default resolvePartProps
