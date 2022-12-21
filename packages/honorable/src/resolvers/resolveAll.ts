import { HonorableTheme } from '../types.js'

import resolveBreakpoints from './resolveBreakpoints.js'
import resolvePseudoSelectors from './resolvePseudoSelectors.js'
import resolveColor from './resolveColor.js'

function resolveAll(props: object, theme: HonorableTheme) {
  return resolveColor(resolvePseudoSelectors(resolveBreakpoints(props, theme)), theme)
}

export default resolveAll
