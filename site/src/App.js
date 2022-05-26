import { useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider, mergeTheme } from 'honorable'

import theme from './extended-honorable-theme'

import Layout from './components/layout/Layout'

import Home from './scenes/Home'
import Onboarding from './scenes/Onboarding'

import ThemeModeContext from './contexts/ThemeModeContext'

function App() {
  const [themeMode, setThemeMode] = useState('light')
  const themeModeContextValue = useMemo(() => [themeMode, setThemeMode], [themeMode])

  return (
    <ThemeModeContext.Provider value={themeModeContextValue}>
      <ThemeProvider theme={mergeTheme(theme, { mode: themeMode })}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route
                path="/onboarding"
                element={<Onboarding />}
              />
              <Route
                path="*"
                element={<Home />}
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export default App
