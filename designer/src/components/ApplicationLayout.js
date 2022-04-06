import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CssBaseline, Div, Span, ThemeProvider } from 'honorable'

import theme from '../theme'
import defaultTheme from '../defaultTheme'

import ThemeEditor from './ThemeEditor'

function ApplicationLayout({ children }) {
  const [mode, setMode] = useState('light')
  const [userTheme, setUserTheme] = useState(defaultTheme)

  useEffect(() => setUserTheme(defaultTheme), [setUserTheme])

  return (
    <>
      <Span
        userSelect="none"
        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      >
        {mode}
      </Span>
      <Span
        mp="ml-2"
        userSelect="none"
        onClick={() => window.confirm('Are you sure you want to reset the theme?') && setUserTheme(defaultTheme)}
      >
        Reset theme
      </Span>
      <Span
        mp="ml-2"
        userSelect="none"
        onClick={() => window.confirm('Are you sure you want to erase the theme?') && setUserTheme({})}
      >
        Erase theme
      </Span>
      <Link to="/">
        Dashboard
      </Link>
      <Link to="/typography">
        Typography
      </Link>
      <Div flexpad="x4s">
        <ThemeProvider theme={{ ...theme, mode }}>
          <ThemeEditor
            theme={userTheme}
            setTheme={setUserTheme}
          />
        </ThemeProvider>
        <ThemeProvider theme={{ ...userTheme, mode }}>
          <CssBaseline />
          <Div flexGrow={1}>
            {children}
          </Div>
        </ThemeProvider>
      </Div>
    </>
  )
}

export default ApplicationLayout
