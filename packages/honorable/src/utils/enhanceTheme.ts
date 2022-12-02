import { HonorableTheme } from '../types'

import resolveColor, { resolveColorString } from '../resolvers/resolveColor'

// Add utils to the theme
function enhanceTheme(theme: HonorableTheme) {
  return {
    ...theme,
    utils: {
      resolveColorString: (color: string) => resolveColorString(color, theme),
      resolveColorObject: (object: object) => resolveColor(object, theme),
    },
  } as HonorableTheme
}

export default enhanceTheme
