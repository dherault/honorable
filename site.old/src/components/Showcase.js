import { useContext, useEffect, useMemo, useState } from 'react'
import {
  A,
  Div,
  P,
  Span,
  ThemeProvider,
  mergeTheme,
} from 'honorable'
import defaultTheme from 'honorable-theme-default'

import honorableTheme from '../extended-honorable-theme'
import flexpadTheme from '../flexpad-theme'

import ThemeModeContext from '../contexts/ThemeModeContext'
import ShowcaseContext from '../contexts/ShowcaseContext'
import ShowcaseInnerContext from '../contexts/ShowcaseInnerContext'

import useDebounce from '../hooks/useDebounce'

import ComponentsShowcase from './ComponentsShowcase'
import CodeBlock from './CodeBlock'

const themes = [
  mergeTheme(defaultTheme, flexpadTheme),
  mergeTheme(defaultTheme, flexpadTheme, {
    name: 'Unicorn lovers',
    colors: {
      primary: '#FF1493',
    },
  }),
]

const themeTransitionPeriod = 3300

function prepareTheme(theme, mode) {
  return mergeTheme(theme, {
    mode,
    global: [
      {
        transition: 'all 200ms ease',
      },
    ],
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
        Theme: 
        {' '}
        {currentTheme.name}
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

function MainShowcase() {
  return (
    <WithRotatingTheme>
      <ComponentsShowcase />
    </WithRotatingTheme>
  )
}

function SquareShowcase() {
  return (
    <WithTheme theme={honorableTheme}>
      <Div
        flexGrow={1}
        xflex="y5"
      >
        <P text="large">
          And here you go:
        </P>
        <Div
          mt={1}
          xflex="x5"
        >
          <P
            text="xlarge"
            transform="scale(-1, 1)"
          >
            🎉
          </P>
          <Div
            mx={4}
            width={64}
            height={64}
            backgroundColor="primary"
          />
          <P
            text="xlarge"
          >
            🎉
          </P>
        </Div>
      </Div>
    </WithTheme>
  )
}

const innerShowcaseToComponent = {
  conventions: ConventionsShowcase,
  theming: ThemingShowcase,
  accessibility: AccessibilityShowcase,
  mobile: MobileShowcase,
}

function DesignShowcase() {
  const [innerShowcase] = useContext(ShowcaseInnerContext)
  const Y = innerShowcaseToComponent[innerShowcase] || DefaultDesignShowcase

  return (
    <WithTheme theme={honorableTheme}>
      <Div
        flexGrow={1}
        xflex="y5"
      >
        <Y />
      </Div>
    </WithTheme>
  )
}

function DefaultDesignShowcase() {
  return (
    <>
      <P text="large">
        Click on a link on the left to see some action!
      </P>
      <P
        text="large"
        mt={1}
      >
        🧑‍💻
      </P>
    </>
  )
}

const pillCode = `const theme = {
  Span: {
    Root: [
      ({ pill }) => pill && {
        color: 'white',
        backgroundColor: 'primary',
        padding: '0.5rem 1rem',
        borderRadius: 1000,
      },
    ],
  },
}

//...
<Span pill>
  A pill
</Span>`

function PillShowcase() {
  const extendedTheme = mergeTheme(honorableTheme, {
    Span: {
      Root: [
        ({ pill }) => pill && {
          color: 'white',
          backgroundColor: 'primary',
          padding: '0.5rem 1rem',
          borderRadius: 1000,
        },
      ],
    },
  })

  return (
    <WithTheme theme={extendedTheme}>
      <P text="large">
        Creating your own conventions:
      </P>
      <CodeBlock
        mt={1}
        background="background"
      >
        {pillCode}
      </CodeBlock>
      <P
        mt={1}
        text="large"
      >
        Gives you:
      </P>
      <Span
        pill
        display="block"
        mt={1}
      >
        A pill
      </Span>
    </WithTheme>
  )
}

const aliasesCode = `const theme = {
  aliases: {
    bg: 'background',
  },
}

//...
<Div bg="success" padding="1rem">
  Some div with a colored background
</Div>`

function AliasesShowcase() {
  const extendedTheme = mergeTheme(honorableTheme, {
    aliases: {
      bg: 'background',
    },
  })

  return (
    <WithTheme theme={extendedTheme}>
      <P text="large">
        You can also create your own aliases:
      </P>
      <CodeBlock
        mt={1}
        background="background"
      >
        {aliasesCode}
      </CodeBlock>
      <P
        mt={1}
        text="large"
      >
        Gives you:
      </P>
      <Div
        bg="success"
        p={1}
        mt={1}
      >
        Some div with a colored background
      </Div>
    </WithTheme>
  )
}

function ConventionsShowcase() {
  const [showMore, setShowMore] = useState(false)

  return (
    <Div
      flexGrow={1}
      xflex="y5"
    >
      {showMore ? <AliasesShowcase /> : <PillShowcase />}
      <A
        userSelect="none"
        mt={1.25}
        onClick={() => setShowMore(x => !x)}
      >
        {showMore ? 'Go back' : 'Show me more!'}
      </A>
    </Div>
  )
}

const themingCode = `// Inherit any theme for some cool defaults
const theme = mergeTheme(defaultTheme, {
  mode: 'light',
  colors: {
    primary: '#3e73dd',
    // Use some color helpers along the way
    'primary-light': 'lighten(primary, 12)',
    text: {
      light: '#3b454e',
      dark: 'white',
    },
  },
  html: [
    {
      color: 'text', // Reference colors anywhere
      fontFamily: 'Roboto',
    }
  ],
  // Customize components
  Div: {
    Root:[
      ({ container }) => container && {
        // Applied to <Div container />
        width: 'calc(100% * 3 / 4)',
        margin: '0 auto',
      },
    ],
  },
})

// The only limit is your imagination!
<Div container color="primary-light">
  A colored container
</Div>`

function ThemingShowcase() {
  return (
    <WithTheme theme={honorableTheme}>
      <P text="large">
        Theming made easy:
      </P>
      <Div
        px={2}
        width="100%"
      >
        <CodeBlock
          mt={1}
          width="100%"
          background="background"
        >
          {themingCode}
        </CodeBlock>
      </Div>
    </WithTheme>
  )
}

function AccessibilityShowcase() {
  return (
    'TODO!'
  )
}

const mobileCode = `<Div
  marginTop="1rem"
  marginTop-mobile={0}
  marginTop-tablet="0.5rem"
  display-desktop="flex"
/>
`

function MobileShowcase() {
  return (
    <WithTheme theme={honorableTheme}>
      <P text="large">
        Mobile-ready code is simple:
      </P>
      <CodeBlock
        mt={1}
        background="background"
      >
        {mobileCode}
      </CodeBlock>
      <P
        text="large"
        mt={1}
      >
        Just add your breakpoint's name as a suffix!
      </P>
    </WithTheme>
  )
}

const showcaseToComponent = {
  main: MainShowcase,
  square: SquareShowcase,
  design: DesignShowcase,
  conventions: ConventionsShowcase,
}

// First a display of moult comps just like mui.com
// Then theme switching
// Then depending on scrolling or not, show a different comp
function Showcase() {
  const [showcase] = useContext(ShowcaseContext)
  const debouncedShowcase = useDebounce(showcase, 200)
  const X = showcaseToComponent[debouncedShowcase] || 'div'

  return (
    <Div
      p={2}
      p-mobile={0}
      xflex="y2s"
      height="100%"
      overflowY="auto"
    >
      <X />
    </Div>
  )
}

export default Showcase
