import { Button, Div, ThemeProvider, useTheme } from 'honorable'

const theme = {
  colors: {
    brand: '#0099ff',
  },
  button: {
    defaultProps: {
      backgroundColor: '#0099ff',
      border: 'none',
      mp: 'py-1 px-2',
    },
    // props: {
    //   variant: {
    //     contained: {

    //     },
    //   },
    // },
  },
}

function App() {
  return (
    <>
      <Div
        flex="x5"
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
