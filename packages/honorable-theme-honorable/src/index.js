import { mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'

export default mergeTheme(defaultTheme, {
  h1: {
    defaultProps: {
      fontSize: '5rem',
    },
  },
})
