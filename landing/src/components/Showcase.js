import { useContext, useEffect, useMemo, useState } from 'react'
import {
  A,
  Div,
  P,
  ThemeProvider,
  mergeTheme,
} from 'honorable'
import defaultTheme from 'honorable-theme-default'
import materialTheme from 'honorable-theme-material'
import wireframeTheme from 'honorable-theme-wireframe'
import honorableTheme from 'honorable-theme-honorable'

import useDebounce from '../hooks/useDebounce'
import ShowcaseContext from '../contexts/ShowcaseContext'
import ThemeModeContext from '../contexts/ThemeModeContext'

import UserCard from './UserCard'
import ComponentsShowcase from './ComponentsShowcase'

const themes = [
  defaultTheme,
  materialTheme,
  {
    ...defaultTheme,
    name: 'Unicorn lovers',
    colors: { ...defaultTheme.colors, primary: '#FF1493' },
  },
  wireframeTheme,
]
const themeTransitionPeriod = 3300

function prepareTheme(theme, mode) {
  return mergeTheme(theme, {
    mode,
    global: {
      defaultProps: {
        transition: 'all 330ms ease',
      },
    },
  })
}

function WithRotatingTheme({ children }) {
  const [mode] = useContext(ThemeModeContext)
  const [currentTheme, setCurrentTheme] = useState(themes[0])
  const nextTheme = useMemo(() => themes[(themes.indexOf(currentTheme) + 1) % themes.length], [currentTheme])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentTheme(nextTheme)
    }, themeTransitionPeriod)

    return () => clearTimeout(timeoutId)
  }, [nextTheme])

  return (
    <ThemeProvider theme={prepareTheme(currentTheme, mode)}>
      <A
        userSelect="none"
        onClick={() => setCurrentTheme(nextTheme)}
      >
        Theme: {currentTheme.name}
      </A>
      {children}
    </ThemeProvider>
  )
}

function WithTheme({ children, theme }) {
  const [mode] = useContext(ThemeModeContext)

  return (
    <ThemeProvider theme={prepareTheme(theme, mode)}>
      {children}
    </ThemeProvider>
  )
}

// First a display of moult comps just like mui.com
// Then theme switching
// Then depending on scrolling or not, show a different comp
function Showcase() {
  const [showcase] = useContext(ShowcaseContext)
  const debouncedShowcase = useDebounce(showcase, 150)

  const showcaseToComponent = useMemo(() => ({
    default: (
      <WithRotatingTheme>
        <ComponentsShowcase />
      </WithRotatingTheme>
    ),
    square: (
      <WithTheme theme={honorableTheme}>
        <Div
          flexGrow={1}
          xflex="y5"
        >
          <P
            text="large"
            mt={2}
          >
            And here you go:
          </P>
          <Div
            mt={1}
            width={64}
            height={64}
            borderRadius={4}
            backgroundColor="primary"
            elevation={2}
          />
        </Div>
      </WithTheme>
    ),
  }), [])

  return (
    <Div
      p={2}
      p-mobile={0}
      xflex="y2s"
      height="100%"
    >
      {showcaseToComponent[debouncedShowcase] || null}
    </Div>
  )
}

export default Showcase
