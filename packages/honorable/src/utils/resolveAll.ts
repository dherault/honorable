import { StyleProps, Theme } from '../types'

import resolveAliases from './resolveAliases'
import resolveWebkitProperties from './resolveWebkitProperties'
import resolveColor from './resolveColor'

function resolveAll(props: StyleProps, theme: Theme) {
  return resolveColor(resolveWebkitProperties(resolveAliases(props, theme)), theme)
}

export default resolveAll
