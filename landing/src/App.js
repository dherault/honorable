import { useMemo, useState } from 'react'
import { CssBaseline, ThemeProvider } from 'honorable'
import theme from 'honorable-theme-honorable'

import Home from './scenes/Home'

import ThemeModeContext from './contexts/ThemeModeContext'

function App() {
  const [themeMode, setThemeMode] = useState('light')
  const themeModeContextValue = useMemo(() => [themeMode, setThemeMode], [themeMode])

  return (
    <ThemeModeContext.Provider value={themeModeContextValue}>
      <ThemeModeContext.Consumer>
        {([mode]) => (
          <ThemeProvider theme={{ ...theme, mode }}>
            <CssBaseline />
            <Home />
          </ThemeProvider>
        )}
      </ThemeModeContext.Consumer>
    </ThemeModeContext.Provider>
  )
}

export default App
