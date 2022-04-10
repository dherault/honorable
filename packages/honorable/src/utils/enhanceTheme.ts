import {
  ExtendedTheme,
  StyleProps,
  Theme,
} from '../types'

import resolveColor from './resolveColor'

function enhanceTheme(theme: Theme): ExtendedTheme {
  return {
    ...theme,
    utils: {
      resolveColor: (color: string | StyleProps) => resolveColor(null, color, theme),
    },
  } as ExtendedTheme
}

export default enhanceTheme
