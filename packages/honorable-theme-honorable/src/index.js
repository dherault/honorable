import { mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'

export default mergeTheme(defaultTheme, {
  name: 'Honorable',
  h1: {
    defaultProps: {
      fontSize: '5rem',
    },
  },
  iconButton: {
    customProps: new Map([
      [
        ({ variant }) => variant === 'ghost',
        {
          '&:hover': {
            backgroundColor: 'background',
          },
          '&:active': {
            color: 'white',
            backgroundColor: 'primary',
          },
        },
      ],
    ]),
  },
})
