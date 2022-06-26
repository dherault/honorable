import { useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider, mergeTheme } from 'honorable'

import theme from './extended-honorable-theme'

import Layout from './components/layout/Layout'

import Home from './scenes/Home'
// import Onboarding from './scenes/Onboarding'
import Documentation from './scenes/Documentation'
import ComponentPage from './scenes/Documentation/ComponentPage'
import DocumentationPage from './scenes/Documentation/DocumentationPage'

import ThemeModeContext from './contexts/ThemeModeContext'

import components from './docs/components'
import pages from './docs/pages'

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
              {/* <Route
                path="/onboarding"
                element={<Onboarding />}
              /> */}
              <Route
                path="/docs"
                element={<Documentation />}
              >
                {components.map(({ path, name, json }) => (
                  <Route
                    key={path}
                    path={path}
                    element={(
                      <ComponentPage
                        componentName={name}
                        componentJson={json}
                      />
                    )}
                  />
                ))}
                {pages.map(page => (
                  <Route
                    key={page.path}
                    path={page.path}
                    element={<DocumentationPage contentUrl={page.url} />}
                  />
                ))}
              </Route>
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
