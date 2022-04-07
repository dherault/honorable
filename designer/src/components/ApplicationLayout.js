import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { A, Button, CssBaseline, Div, Span, Switch, ThemeProvider } from 'honorable'

import theme from '../theme'
import defaultTheme from '../defaultTheme'

import ThemeEditor from './ThemeEditor'

function ApplicationLayout({ children }) {
  const [mode, setMode] = useState('light')
  const [userTheme, setUserTheme] = useState(defaultTheme)

  useEffect(() => setUserTheme(defaultTheme), [setUserTheme])

  function handleExport() {
    console.log('export')
  }

  return (
    <ThemeProvider theme={{ ...theme, mode }}>
      <Div
        height={64}
        flexpad="x4"
        mp="px-2"
      >
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
        <A
          as={Link}
          to="/"
          mp="ml-2"
        >
          Dashboard
        </A>
        <A
          as={Link}
          to="/typography"
          mp="ml-2"
        >
          Typography
        </A>
        <A
          as={Link}
          to="/colors"
          mp="ml-2"
        >
          Colors
        </A>
        <Div flexGrow={1} />
        <Switch
          checkedBackground={(
            <Span
              paddingLeft={4}
              paddingTop={3}
              fontSize={18}
            >
              🌜
            </Span>
          )}
          uncheckedBackground={(
            <Span
              paddingRight={4}
              paddingTop={3}
              fontSize={18}
            >
              🌞
            </Span>
          )}
          checked={mode === 'dark'}
          onChange={(event, checked) => setMode(checked ? 'dark' : 'light')}
        />
        <Button
          onClick={handleExport}
          mp="ml-2"
        >
          Export theme
        </Button>
      </Div>
      <Div flexpad="x4s">
        <ThemeEditor
          theme={userTheme}
          setTheme={setUserTheme}
        />
        <ThemeProvider theme={{ ...userTheme, mode }}>
          <CssBaseline />
          <Div flexGrow={1}>
            {children}
          </Div>
        </ThemeProvider>
      </Div>
    </ThemeProvider>
  )
}

export default ApplicationLayout
