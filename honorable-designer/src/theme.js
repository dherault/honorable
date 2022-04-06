export default {
  // mode: 'dark',
  font: '"Roboto", sans-serif',
  colors: {
    brand: {
      light: '#0099ff',
      dark: '#9900ff',
    },
    background: {
      light: '#eee',
      dark: '#222',
    },
    border: {
      light: 'brand',
      dark: '#444',
    },
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
