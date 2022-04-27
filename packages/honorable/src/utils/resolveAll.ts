import { HonorableTheme, StylesProps } from '../types'

import resolveBreakpoints from './resolveBreakpoints'
import resolveAliases from './resolveAliases'
import resolveWebkitProperties from './resolveWebkitProperties'
import resolveColor from './resolveColor'

function resolveAll(props: StylesProps, theme: HonorableTheme) {
  return resolveColor(resolveWebkitProperties(resolveAliases(resolveBreakpoints(props, theme), theme)), theme)
}

export default resolveAll
