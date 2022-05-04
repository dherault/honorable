import { useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from 'honorable'
import theme from 'honorable-theme-honorable'

import Home from './scenes/Home'

import ThemeModeContext from './contexts/ThemeModeContext'
import Xflex from './scenes/Xflex'

function App() {
  const [themeMode, setThemeMode] = useState('light')
  const themeModeContextValue = useMemo(() => [themeMode, setThemeMode], [themeMode])

  return (
    <ThemeModeContext.Provider value={themeModeContextValue}>
      <ThemeProvider theme={{ ...theme, mode: themeMode }}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/xflex"
              element={<Xflex />}
            />
            <Route
              path="*"
              element={<Home />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export default App
