import {
  AnyProps,
  ComponentProps,
  StyleProps,
  Theme,
} from '../types'

import resolveCustomProps from './resolveCustomProps'

// TODO might be flawed
// resolveCustomProps(componentTheme.customProps, props, theme),
// --> resolveCustomProps(componentTheme.customProps?.[partKey], props, theme),
function extractComponentThemeStyle(componentTheme: ComponentProps, partKey: string, props: AnyProps, theme: Theme): StyleProps {
  if (!(componentTheme && typeof componentTheme === 'object')) return null

  return {
    ...(componentTheme.defaultProps?.[partKey] || {}),
    ...resolveCustomProps(componentTheme.customProps, props, theme),
  }
}

export default extractComponentThemeStyle
