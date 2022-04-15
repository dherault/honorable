import {
  ExtendedTheme,
  StyleProps,
  Theme,
} from '../types'

import resolveColor from './resolveColor'

// Add utils to the theme
function enhanceTheme(theme: Theme): ExtendedTheme {
  return {
    ...theme,
    utils: {
      resolveColor: (color: string | StyleProps) => resolveColor(color, theme),
    },
  } as ExtendedTheme
}

export default enhanceTheme
