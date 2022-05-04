import {
  HonorableTheme,
  StylesProps,
} from '../types'

import resolveColor, { resolveColorString } from './resolveColor'

// Add utils to the theme
function enhanceTheme(theme: HonorableTheme) {
  return {
    ...theme,
    utils: {
      resolveColorString: (color: string) => resolveColorString(color, theme),
      resolveColorObject: (object: StylesProps) => resolveColor(object, theme),
    },
  } as HonorableTheme
}

export default enhanceTheme
