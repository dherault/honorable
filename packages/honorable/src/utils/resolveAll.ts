import { HonorableTheme } from '../types'

import resolveBreakpoints from './resolveBreakpoints'
import resolveAliases from './resolveAliases'
import resolveXflex from './resolveXflex'
import resolveMp from './resolveMp'
import resolveWebkitProperties from './resolveWebkitProperties'
import resolveColor from './resolveColor'

function resolveAll(props: object, theme: HonorableTheme) {
  return resolveColor(resolveWebkitProperties(resolveMp(resolveXflex(resolveAliases(resolveBreakpoints(props, theme), theme)))), theme)
}

export default resolveAll
