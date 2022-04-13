import { CssBaseline, ThemeProvider } from 'honorable'
import theme from 'honorable-theme-honorable'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      Landing
    </ThemeProvider>
  )
}

export default App
