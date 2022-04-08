import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { A, Button, CssBaseline, Div, H1, Img, Nav, Span, Switch, ThemeProvider, useTheme } from 'honorable'

import theme from '../theme'
import defaultTheme from '../defaultTheme'
import UserThemeContext from '../contexts/UserThemeContext'

import ThemeEditor from './ThemeEditor'

function ApplicationLayout({ children }) {
  const [mode, setMode] = useState('light')
  const [userTheme, setUserTheme] = useState(defaultTheme)
  const modedTheme = useMemo(() => ({ ...theme, mode }), [mode])
  const modedUserTheme = useMemo(() => ({ ...userTheme, mode }), [userTheme, mode])
  const userThemeValue = useMemo(() => [modedUserTheme, setUserTheme, defaultTheme], [modedUserTheme])

  useEffect(() => setUserTheme(defaultTheme), [setUserTheme])

  function handleExport() {
    console.log('export')
  }

  return (
    <UserThemeContext.Provider value={userThemeValue}>
      <ThemeProvider theme={modedTheme}>
        <Div
          height="100vh"
          xflex="y2s"
        >
          <Nav
            position="relative"
            elevation={2}
            height={64}
            px={1}
            xflex="x4"
            flexShrink={0}
          >
            <Img
              src="/images/logo.png"
              width={32}
              marginTop={-4}
            />
            <H1 ml={1}>
              Honorable Designer
            </H1>
            <A
              as={Link}
              to="/"
              ml={2}
            >
              Dashboard
            </A>
            <A
              as={Link}
              to="/typography"
              ml={1}
            >
              Typography
            </A>
            <A
              as={Link}
              to="/colors"
              ml={1}
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
              variant="outlined"
              ml={1}
              onClick={() => window.confirm('Are you sure you want to reset the theme?') && setUserTheme(defaultTheme)}
            >
              Reset theme
            </Button>
            <Button
              onClick={handleExport}
              ml={1}
            >
              Export theme
            </Button>
          </Nav>
          <Div
            flexGrow={1}
            xflex="x4s"
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
