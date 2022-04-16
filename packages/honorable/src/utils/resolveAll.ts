import { HonorableTheme, StyleProps } from '../types'

import resolveAliases from './resolveAliases'
import resolveWebkitProperties from './resolveWebkitProperties'
import resolveColor from './resolveColor'

function resolveAll(props: StyleProps, theme: HonorableTheme) {
  return resolveColor(resolveWebkitProperties(resolveAliases(props, theme)), theme)
}

export default resolveAll
