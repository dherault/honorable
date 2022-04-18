import { useContext, useEffect, useMemo, useState } from 'react'
import {
  A,
  Div,
  ThemeProvider,
  mergeTheme,
} from 'honorable'
import defaultTheme from 'honorable-theme-default'
// import materialTheme from 'honorable-theme-material'
import wireframeTheme from 'honorable-theme-wireframe'

import useDebounce from '../../hooks/useDebounce'
import ShowcaseContext from '../../contexts/ShowcaseContext'
import ThemeModeContext from '../../contexts/ThemeModeContext'

import ProductCard from './ProductCard'
import ComponentsShowcase from './ComponentsShowcase'

const themes = [
  defaultTheme,
  // materialTheme,
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
    // const timeoutId = setTimeout(() => {
    //   setCurrentTheme(nextTheme)
    // }, themeTransitionPeriod)

    // return () => clearTimeout(timeoutId)
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
  const debouncedShowcase = useDebounce(showcase, 250)

  const showcaseToComponent = useMemo(() => ({
    default: (
      <WithRotatingTheme>
        <ComponentsShowcase />
      </WithRotatingTheme>
    ),
    productCard: (
      <WithTheme theme={defaultTheme}>
        <Div
          flexGrow={1}
          xflex="y5"
        >
          <ProductCard />
        </Div>
      </WithTheme>
    ),
  }), [])

  return (
    <Div
      p={2}
      xflex="y2s"
      height="100%"
    >
      {showcaseToComponent[debouncedShowcase] || showcaseToComponent.default}
    </Div>
  )
}

export default Showcase
