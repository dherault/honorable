import { mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'

export default mergeTheme(defaultTheme, {
  colors: {
    'background-extra-light': {
      light: '#f5f7f9',
      dark: '#3a3a3a',
    },
  },
  h1: {
    defaultProps: {
      margin: 0,
      fontSize: '1.5rem',
    },
  },
  h2: {
    defaultProps: {
      margin: 0,
      fontSize: '1.5rem',
    },
  },
  h3: {
    defaultProps: {
      margin: '0.5rem 0',
    },
  },
  sub: {
    defaultProps: {
      display: 'block',
      fontSize: '1rem',
      whiteSpace: 'break-spaces',
      lineHeight: '1.5rem',
    },
  },
  switch: {
    defaultProps: {
      transition: 'background-color 150ms ease',
    },
    customProps: new Map([
      [
        ({ checked, noBackgroundColor }) => checked && !noBackgroundColor,
        {
          backgroundColor: 'primary',
        },
      ],
    ]),
  },
  p: {
    defaultProps: {
      margin: 0,
    },
  },
  pre: {
    defaultProps: {
      margin: 0,
      padding: 0,
      backgroundColor: 'transparent',
    },
  },
})
