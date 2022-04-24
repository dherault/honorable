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
    background: {
      light: 'white',
      dark: 'black',
    },
    border: 'primary',
  },
  global: {
    customProps: new Map([
      [
        ({ elevation }) => elevation > 0,
        {
          boxShadow: 'none',
          border: '1px solid border',
          margin: -1,
        },
      ],
    ]),
  },
  buttonBase: {
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
