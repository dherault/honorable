import { HonorableTheme } from '../types'

import resolveBreakpoints from './resolveBreakpoints'
import resolveAliases from './resolveAliases'
import resolveWebkitProperties from './resolveWebkitProperties'
import resolveColor from './resolveColor'

function resolveAll(props: object, theme: HonorableTheme) {
  return resolveColor(resolveWebkitProperties(resolveAliases(resolveBreakpoints(props, theme), theme)), theme)
}

export default resolveAll
