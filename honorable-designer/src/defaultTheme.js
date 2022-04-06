export default {
  // mode: 'dark',
  font: 'sans-serif',
  colors: {
    brand: {
      light: '#0099ff',
      dark: '#9900ff',
    },
    background: {
      light: 'transparent',
      dark: '#333',
    },
    'background-light': {
      light: '#eee',
      dark: '#444',
    },
    text: {
      light: 'inherit',
      dark: 'white',
    },
    border: 'blue',
  },
  global: {
    defaultProps: {
      color: 'text',
    },
    customProps: {
      text: {
        small: {
          fontSize: '0.75rem',
        },
      },
    },
  },
  button: {
    defaultProps: {
      // backgroundColor: 'brand',
      // border: 'none',
      // cursor: 'pointer',
      // padding: '0.5rem 1rem',
      // ':hover': {
      //   backgroundColor: 'red',
      // },
    },
  },
  pre: {
    defaultProps: {
      display: 'inline',
      padding: 4,
      backgroundColor: 'background-light',
    },
  },
}
