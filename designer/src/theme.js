import defaultTheme from './defaultTheme'

export default {
  ...defaultTheme,
  h1: {
    defaultProps: {
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
    partCustomProps: {
      root: new Map([
        [
          ({ checked, noBackgroundColor }) => checked && !noBackgroundColor,
          {
            backgroundColor: 'primary',
          },
        ],
      ]),
    },
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
}
