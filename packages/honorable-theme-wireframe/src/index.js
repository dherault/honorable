import { mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'

export default mergeTheme(defaultTheme, {
  name: 'Wireframe',
  colors: {
    primary: {
      light: 'black',
      dark: 'white',
    },
    text: 'primary',
  },
  button: {
    defaultProps: {
      color: 'text',
      backgroundColor: 'transparent',
      borderColor: 'primary',
      '&:hover': {
        backgroundColor: 'transparencify(primary, 85)',
      },
    },
  },
  input: {
    defaultProps: {
      color: 'text',
      backgroundColor: 'transparent',
      borderColor: 'primary',
    },
  },
})
