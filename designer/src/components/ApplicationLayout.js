import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { A, Button, CssBaseline, Div, H1, Img, Nav, Span, Switch, ThemeProvider } from 'honorable'

import theme from '../theme'
import defaultTheme from '../defaultTheme'
import UserThemeContext from '../contexts/UserThemeContext'

import ThemeEditor from './ThemeEditor'

function ApplicationLayout({ children }) {
  const [mode, setMode] = useState('light')
  const [userTheme, setUserTheme] = useState(defaultTheme)
  const modedUserTheme = useMemo(() => ({ ...userTheme, mode }), [userTheme, mode])
  const userThemeValue = useMemo(() => [modedUserTheme, setUserTheme, defaultTheme], [modedUserTheme])

  useEffect(() => setUserTheme(defaultTheme), [setUserTheme])

  function handleExport() {
    console.log('export')
  }

  return (
    <UserThemeContext.Provider value={userThemeValue}>
      <ThemeProvider theme={{ ...theme, mode }}>
        <Div
          height="100vh"
          flexpad="y2s"
        >
          <Nav
            position="relative"
            elevation={2}
            height={64}
            flexpad="x4"
            mp="px-2"
          >
            <Img
              src="/images/logo.png"
              width={32}
              marginTop={-4}
            />
            <H1 mp="ml-2">
              Honorable Designer
            </H1>
            <A
              as={Link}
              to="/"
              mp="ml-4"
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
            <Button
              onClick={handleExport}
              mp="ml-2"
            >
              Export theme
            </Button>
          </Nav>
          <Div
            flexGrow={1}
            flexpad="x4s"
          >
            <ThemeEditor />
            <ThemeProvider theme={modedUserTheme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </Div>
        </Div>
      </ThemeProvider>
    </UserThemeContext.Provider>
  )
}

export default ApplicationLayout
