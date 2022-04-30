import merge from 'lodash.merge'

import { HonorableTheme, StylesProps } from '../types'

import resolveCustomProps from '../utils/resolveCustomProps'
import filterObject from '../utils/filterObject'

import resolveAll from './resolveAll'
import resolveAliases from './resolveAliases'

// Return the style object of applied partProps
function resolvePartProps(name: string, partKey: string, props: object, honorableOverridenProps: object, theme: HonorableTheme): StylesProps {
  const componentTheme = theme[name]

  if (!(componentTheme && typeof componentTheme === 'object')) return {}

  const partTheme = componentTheme.partProps?.[partKey]

  if (!(partTheme && typeof partTheme === 'object')) return {}

  const resolvedProps = resolveAliases(props, theme)
  const resolvedDefaultProps = resolveAliases(filterObject(partTheme.defaultProps), theme)

  return resolveAll(
    merge(
      {},
      resolvedDefaultProps,
      resolveCustomProps(partTheme.customProps, { ...resolvedDefaultProps, ...resolvedProps, ...honorableOverridenProps }, theme),
    ),
    theme,
  )
}

export default resolvePartProps
