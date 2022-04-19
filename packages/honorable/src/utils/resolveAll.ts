import { HonorableTheme, StyleProps } from '../types'

import resolveBreakpoints from './resolveBreakpoints'
import resolveAliases from './resolveAliases'
import resolveWebkitProperties from './resolveWebkitProperties'
import resolveColor from './resolveColor'

function resolveAll(props: StyleProps, theme: HonorableTheme) {
  return resolveColor(resolveWebkitProperties(resolveAliases(resolveBreakpoints(props, theme), theme)), theme)
}

export default resolveAll
