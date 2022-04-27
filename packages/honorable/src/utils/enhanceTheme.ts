import {
  HonorableTheme,
  StylesProps,
} from '../types'

import resolveColor from './resolveColor'

// Add utils to the theme
function enhanceTheme(theme: HonorableTheme) {
  return {
    ...theme,
    utils: {
      resolveColor: (color: string | StylesProps) => resolveColor(color, theme),
    },
  } as HonorableTheme
}

export default enhanceTheme
