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
  pre: {
    defaultProps: {
      ...defaultTheme.pre,
      margin: 0,
      padding: 0,
    },
  },
  sub: {
    defaultProps: {
      fontSize: '1rem',
      whiteSpace: 'break-spaces',
      lineHeight: '1.5rem',
    },
  },
  switch: {
    defaultProps: {
      transition: 'background-color 150ms ease',
    },
    customProps: {
      checked: new Map([
        [
          true,
          ({ noBackgroundColor }) => !noBackgroundColor && {
            backgroundColor: 'brand',
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
}
