import merge from 'lodash.merge'

import {
  HonorableTheme,
  StyleProps,
} from '../types'

import resolveCustomProps from './resolveCustomProps'
import filterObject from './filterObject'

// Return the style object of applied partProps
function resolvePartProps(componentKey: string, partKey: string, props: object, theme: HonorableTheme): StyleProps {
  const componentTheme = theme[componentKey]

  if (!(componentTheme && typeof componentTheme === 'object')) return {}

  const partTheme = componentTheme.partProps?.[partKey]

  if (!(partTheme && typeof partTheme === 'object')) return {}

  return merge(
    {},
    filterObject(partTheme.defaultProps),
    resolveCustomProps(partTheme.customProps, props, theme),
  )
}

export default resolvePartProps
