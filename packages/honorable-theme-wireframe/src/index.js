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
    background: 'transparent',
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
  iconButton: {
    defaultProps: {
      elevation: 0,
      border: '1px solid primary',
      padding: 'calc(0.5rem - 1px)',
    },
  },
})
