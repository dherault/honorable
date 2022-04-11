import {
  AnyProps,
  StyleProps,
  Theme,
} from '../types'

import resolveCustomProps from './resolveCustomProps'

function resolvePartCustomProps(componentKey: string, partKey: string, props: AnyProps, theme: Theme): StyleProps {
  const componentTheme = theme[componentKey]

  if (!(componentTheme && typeof componentTheme === 'object')) return {}

  return resolveCustomProps(componentTheme.partCustomProps?.[partKey], props, theme)
}

export default resolvePartCustomProps
