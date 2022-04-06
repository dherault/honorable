export default {
  // mode: 'dark',
  font: 'sans-serif',
  colors: {
    brand: {
      light: '#0099ff',
      dark: '#9900ff',
    },
    background: {
      light: 'white',
      dark: '#333',
    },
    border: 'blue',
  },
  button: {
    defaultProps: {
      backgroundColor: 'brand',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem 1rem',
      ':hover': {
        backgroundColor: 'red',
      },
    },
    customProps: {
      variant: {
        outlined: {
          backgroundColor: 'transparent',
          border: '1px solid brand',
          padding: 8,
          ':hover': {
            backgroundColor: 'brand',
          },
        },
      },
    },
  },
}
