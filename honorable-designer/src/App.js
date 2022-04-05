import { CssBaseline, ThemeProvider } from 'honorable'
import { useState } from 'react'

import ApplicationLayout from './components/ApplicationLayout'

const defaultTheme = {
  // mode: 'dark',
  font: 'sans-serif',
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
  const [mode, setMode] = useState('light')
  const [theme, setTheme] = useState(defaultTheme)

  return (
    <ThemeProvider theme={{ ...theme, mode }}>
      <CssBaseline />
      <ApplicationLayout>
        Foo
      </ApplicationLayout>
    </ThemeProvider>
  )
}

export default App
