import { useCallback, useEffect, useMemo, useState } from 'react'
import { CssBaseline, Div, ThemeProvider } from 'honorable'

import theme from '../theme'
import defaultTheme from '../defaultTheme'
import UserThemeContext from '../contexts/UserThemeContext'
import AreVariationsDisplayedContext from '../contexts/AreVariationsDisplayedContext'
import { deserializeTheme, serializeTheme } from '../utils/themeSerializer'

import Navigation from './Navigation'
import ThemeEditor from './ThemeEditor'

const localStorageUserThemeKey = 'honorable-userTheme'

const themeResetListeners = []

function addThemeResetListener(listener) {
  themeResetListeners.push(listener)

  return () => {
    const index = themeResetListeners.indexOf(listener)

    if (index > -1) {
      themeResetListeners.splice(index, 1)
    }
  }
}

function ApplicationLayout({ children }) {
  const [mode, setMode] = useState('light')
  const [userTheme, setUserTheme] = useState(defaultTheme)
  const [areVariationsDisplayed, setAreVariationsDisplayed] = useState(false)
  const modedTheme = useMemo(() => ({ ...theme, mode }), [mode])
  const modedUserTheme = useMemo(() => ({ ...userTheme, mode }), [userTheme, mode])
  const userThemeValue = useMemo(() => [modedUserTheme, setUserTheme, defaultTheme, addThemeResetListener], [modedUserTheme])
  const areVariationsDisplayedValue = useMemo(() => [areVariationsDisplayed, setAreVariationsDisplayed], [areVariationsDisplayed])

  const persistUserTheme = useCallback(() => {
    localStorage.setItem(localStorageUserThemeKey, serializeTheme(userTheme))
  }, [userTheme])

  const loadUserTheme = useCallback(() => {
    try {
      const userThemeString = localStorage.getItem(localStorageUserThemeKey)
      const rehydratedTheme = userThemeString ? deserializeTheme(userThemeString) : defaultTheme

      setUserTheme({ ...rehydratedTheme, rehydrated: true })
    }
    catch (error) {
      //
    }
  }, [])

  useEffect(() => {
    loadUserTheme()
  }, [loadUserTheme])

  useEffect(() => {
    persistUserTheme()
  }, [persistUserTheme])

  function handleReset() {
    window.confirm('Are you sure you want to reset the theme?')

    setUserTheme(defaultTheme)

    themeResetListeners.forEach(listener => listener(defaultTheme))
  }

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
              onReset={handleReset}
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
