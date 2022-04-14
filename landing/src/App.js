import { CssBaseline, ThemeProvider } from 'honorable'
import theme from 'honorable-theme-honorable'

import Home from './scenes/Home'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  )
}

export default App
