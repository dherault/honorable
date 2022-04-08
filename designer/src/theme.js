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
      margin: 0,
    },
  },
  pre: {
    defaultProps: {
      ...defaultTheme.pre,
      margin: 0,
      padding: 0,
    },
  },
}
