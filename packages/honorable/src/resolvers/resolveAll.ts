import { HonorableTheme } from '../types'

import resolveBreakpoints from './resolveBreakpoints'
import resolvePseudoSelectors from './resolvePseudoSelectors'
import resolveColor from './resolveColor'

function resolveAll(props: object, theme: HonorableTheme) {
  return resolveColor(resolvePseudoSelectors(resolveBreakpoints(props, theme)), theme)
}

export default resolveAll
