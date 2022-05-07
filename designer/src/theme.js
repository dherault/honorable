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
    defaultStyles: {
      margin: 0,
      fontSize: '1.5rem',
    },
  },
  h2: {
    defaultStyles: {
      margin: 0,
      fontSize: '1.5rem',
    },
  },
  h3: {
    defaultStyles: {
      margin: '0.5rem 0',
    },
  },
  sub: {
    defaultStyles: {
      display: 'block',
      fontSize: '1rem',
      whiteSpace: 'break-spaces',
      lineHeight: '1.5rem',
    },
  },
  switch: {
    defaultStyles: {
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
    defaultStyles: {
      margin: 0,
    },
  },
  pre: {
    defaultStyles: {
      margin: 0,
      padding: 0,
      backgroundColor: 'transparent',
    },
  },
})
