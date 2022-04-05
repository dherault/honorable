import { Button, CssBaseline, Div, ThemeProvider, useTheme } from 'honorable'

const theme = {
  mode: 'dark',
  colors: {
    brand: {
      light: '#0099ff',
      dark: '#9900ff',
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

function App() {
  return (
    <>
      <CssBaseline />
      <Div
        flexpad="x5"
        border="1px solid blue"
        color="red"
      >
        A cool box
      </Div>
      <Button mp="my-2">
        A cool button
      </Button>
      <div>
        <ThemeProvider theme={theme}>
          <CustomComponent />
          <Button>
            A themed button
          </Button>
          <Button
            variant="outlined"
            mp="ml-2"
          >
            A themed button
          </Button>
        </ThemeProvider>
      </div>
    </>
  )
}

function CustomComponent() {
  const theme = useTheme()

  return (
    <div style={{ backgroundColor: theme?.colors?.brand }}>
      Custom component
    </div>
  )
}

export default App
