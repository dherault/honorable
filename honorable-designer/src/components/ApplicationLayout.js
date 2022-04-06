import { CssBaseline, Div, Span, ThemeProvider } from 'honorable'
import { useState } from 'react'

import theme from '../theme'
import defaultTheme from '../defaultTheme'

import ThemeEditor from './ThemeEditor'

function ApplicationLayout({ children }) {
  const [mode, setMode] = useState('light')
  const [userTheme, setUserTheme] = useState(defaultTheme)

  return (
    <div>
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
      <Div flexpad="x4s">
        <ThemeProvider theme={{ ...theme, mode }}>
          <CssBaseline />
          <ThemeEditor
            theme={userTheme}
            setTheme={setUserTheme}
          />
        </ThemeProvider>
        <ThemeProvider theme={{ ...userTheme, mode }}>
          <Div
            flexGrow={1}
            backgroundColor="background"
          >
            {children}
          </Div>
        </ThemeProvider>
      </Div>
    </div>
  )
}

export default ApplicationLayout
