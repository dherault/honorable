import { mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'

export default mergeTheme(defaultTheme, {
  name: 'Honorable',
  global: {
    customProps: new Map([
      [
        ({ text }) => text === 'small',
        {
          fontSize: '0.875rem',
        },
      ],
      [
        ({ text }) => text === 'normal',
        {
          fontSize: '1rem',
        },
      ],
      [
        ({ text }) => text === 'large',
        {
          fontSize: '1.5rem',
        },
      ],
    ]),
  },
  div: {
    customProps: new Map([
      [
        ({ container }) => container,
        {
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: 'calc(1080px * 3 / 4)',
        },
      ],
    ]),
  },
  h1: {
    defaultProps: {
      fontSize: '5rem',
    },
  },
  h2: {
    defaultProps: {
      fontSize: '2rem',
    },
  },
  iconButton: {
    customProps: new Map([
      [
        ({ variant }) => variant === 'ghost',
        {
          elevation: 0,
          background: 'transparent',
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
