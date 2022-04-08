import { useEffect, useMemo, useState } from 'react'
import { CssBaseline, Div, ThemeProvider } from 'honorable'

import theme from '../theme'
import defaultTheme from '../defaultTheme'
import UserThemeContext from '../contexts/UserThemeContext'
import AreVariationsDisplayedContext from '../contexts/AreVariationsDisplayedContext'

import Navigation from './Navigation'
import ThemeEditor from './ThemeEditor'

function ApplicationLayout({ children }) {
  const [mode, setMode] = useState('light')
  const [userTheme, setUserTheme] = useState(defaultTheme)
  const [areVariationsDisplayed, setAreVariationsDisplayed] = useState(false)
  const modedTheme = useMemo(() => ({ ...theme, mode }), [mode])
  const modedUserTheme = useMemo(() => ({ ...userTheme, mode }), [userTheme, mode])
  const userThemeValue = useMemo(() => [modedUserTheme, setUserTheme, defaultTheme], [modedUserTheme])
  const areVariationsDisplayedValue = useMemo(() => [areVariationsDisplayed, setAreVariationsDisplayed], [areVariationsDisplayed])

  useEffect(() => setUserTheme(defaultTheme), [setUserTheme])

  return (
    <UserThemeContext.Provider value={userThemeValue}>
      <AreVariationsDisplayedContext.Provider value={areVariationsDisplayedValue}>
        <ThemeProvider theme={modedTheme}>
          <Div
            height="100vh"
            xflex="y2s"
          >
            <Navigation
              mode={mode}
              setMode={setMode}
              onReset={() => window.confirm('Are you sure you want to reset the theme?') && setUserTheme(defaultTheme)}
            />
            <Div
              flexGrow={1}
              xflex="x4s"
              maxWidth="100vw"
              overflow="hidden"
            >
              <ThemeEditor />
              <Div
                flexGrow={1}
                overflowX="hidden"
                overflowY="scroll"
              >
                <ThemeProvider theme={modedUserTheme}>
                  <CssBaseline />
                  {children}
                </ThemeProvider>
              </Div>
            </Div>
          </Div>
        </ThemeProvider>
      </AreVariationsDisplayedContext.Provider>
    </UserThemeContext.Provider>
  )
}

export default ApplicationLayout
