import { useContext, useEffect, useMemo, useState } from 'react'
import {
  A,
  Button,
  Div,
  Footer,
  H1,
  H2,
  Icon,
  IconButton,
  Input,
  P,
  Pre,
  Section,
  Span,
  ThemeProvider,
} from 'honorable'
import defaultTheme from 'honorable-theme-default'
// import materialTheme from 'honorable-theme-material'
import wireframeTheme from 'honorable-theme-wireframe'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import highlighterStyleLight from 'react-syntax-highlighter/dist/esm/styles/prism/material-light'
import highlighterStyleDark from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark'
import { AiFillGithub } from 'react-icons/ai'

import ThemeSwitch from '../components/ThemeSwitch'
import ThemeModeContext from '../contexts/ThemeModeContext'

SyntaxHighlighter.registerLanguage('jsx', jsx)

function Home() {
  return (
    <Div
      xflex="x4s"
      height="100vh"
    >
      <Div
        flexGrow={1}
        elevation={1}
        height="100vh"
        overflowY="auto"
        position="relative"
        zIndex={10}
      >
        <HeroSection />
        <DemoSection />
        <FooterSection />
      </Div>
      <Div
        position="relative"
        flexShrink={0}
        width="calc(100vh * 3 / 4)"
        backgroundColor="background-light"
      >
        <ComponentsDisplay />
        <ThemeSwitch
          position="absolute"
          right="2rem"
          top="2rem"
        />
        <Div
          xflex="x6"
          position="absolute"
          bottom="2rem"
          right="2rem"
        >
          <A
            href="https://docs.honorable.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </A>
          <IconButton
            variant="ghost"
            as="a"
            display="flex"
            color="text-light"
            ml={1}
            mr={-0.5}
            my={-0.5}
            cursor="pointer"
            href="https://github.com/dherault/honorable"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub
              color="inherit"
              size={24}
            />
          </IconButton>
        </Div>
      </Div>
    </Div>
  )
}

function HeroSection() {
  return (
    <Section
      height="100vh"
      p={2}
      xflex="y5"
    >
      <Div mt={-8}>
        <H1>
          <Span
            xflex="x5"
            display="inline-flex"
            borderRadius={24}
            overflow="hidden"
            mb={1}
          >
            🙏
          </Span>
          <br />
          Implement any
          <br />
          <Span
            background="linear-gradient(45deg, primary, lighten(primary, 10))"
            backgroundClip="text"
            webkitTextFillColor="transparent"
          >
            Design System
          </Span>
          <br />
          in React
        </H1>
        <Div
          xflex="x4s"
          mt={2}
        >
          <A
            href="https://docs.honorable.design/quick-start"
            target="_blank"
            rel="noreferer noopener"
          >
            <Button size="large">
              Get Started
            </Button>
          </A>
          <NpmInstallPre />
        </Div>
      </Div>
    </Section>
  )
}

function NpmInstallPre() {
  const text = 'npm i --save honorable'
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    window.navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <Pre
      xflex="x4"
      flexGrow={1}
      border="1px solid border"
      borderRadius={4}
      ml={2}
      px={1}
    >
      {copied ? 'copied!' : text}
      <Span flexGrow={1} />
      <IconButton
        variant="ghost"
        ml={0.5}
        color="text-light"
        onClick={handleCopy}
      >
        {/* from https://icons.modulz.app/ */}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </IconButton>
    </Pre>
  )
}

const createCode = code => `import { Button, Div, H3, Img, Span } from 'honorable'

function UserCard({ user = {} }) {
  return (${code}
  )
}`

const codeText = `
    <Div
      padding="2rem"
      elevation={1}
    >
      <Div display="flex">
        <Img
          src={user.imageUrl}
          width="64px"
          height="64px"
          alt="user profile"
        />
        <H3 marginLeft="1rem">
          {user.name}
        </H3>
      </Div>
      <Div marginTop="1rem">
        {user.bio}
      </Div>
      <Div
        marginTop="1rem"
        display="flex"
        justifyContent="flex-end"
      >
        <Button>
          Contact
        </Button>
      </Div>
    </Div>`

const codeTextShorthands = `
    <Div
      p={2}
      elevation={1}
    >
      <Div xflex="x4">
        <Img
          src={user.imageUrl}
          width="64px"
          height="64px"
          alt="user profile"
        />
        <H3 ml={1}>
          {user.name}
        </H3>
      </Div>
      <Div mt={1}>
        {user.bio}
      </Div>
      <Div
        mt={1}
        xflex="x6"
      >
        <Button>
          Contact
        </Button>
      </Div>
    </Div>`

function DemoSection() {
  const [themeMode] = useContext(ThemeModeContext)
  const [isShorthands, setIsShorthands] = useState(false)

  const highlighterStyle = themeMode === 'dark' ? highlighterStyleDark : highlighterStyleLight
  const customHighlighterStyle = {
    ...highlighterStyle,
    'code[class*="language-"]': {
      ...highlighterStyle['code[class*="language-"]'],
      background: 'transparent',
    },
    'pre[class*="language-"]': {
      ...highlighterStyle['pre[class*="language-"]'],
      background: 'transparent',
    },
  }

  return (
    <Section
      height="100vh"
      py={2}
      px={4}
      xflex="y5s"
    >
      <Div flexShrink={0}>
        <H2
          pt={2}
          textAlign="center"
        >
          HTML tags as base components, CSS as props
        </H2>
      </Div>
      <Div
        mt={2}
        p={1}
        width="100%"
        flexGrow={1}
        overflowY="scroll"
        border="1px solid border"
        backgroundColor="background-light"
        borderRadius={4}
        xflex="x1"
      >
        <SyntaxHighlighter
          language="jsx"
          style={customHighlighterStyle}
          customStyle={{
            fontSize: '14px',
            margin: 0,
            padding: 0,
          }}
        >
          {createCode(isShorthands ? codeTextShorthands : codeText)}
        </SyntaxHighlighter>
      </Div>
      <Div
        mt={0.5}
        pb={2}
        xflex="x6"
        flexShrink={0}
      >
        <A
          onClick={() => setIsShorthands(x => !x)}
          userSelect="none"
        >
          {isShorthands ? 'Use pure CSS syntax' : 'Use shorthands!'}
        </A>
      </Div>
    </Section>
  )
}

function FooterSection() {
  return (
    <Footer
      py={2}
      px={4}
      xflex="x4"
    >
      <P>
        MIT License
      </P>
      <Span flexGrow={1} />
      <P>
        Made with ❤️ in 🇫🇮 by{' '}
        <A
          href="https://github.com/dherault"
          target="_blank"
          rel="noopener noreferrer"
        >
          David Hérault
        </A>

      </P>
    </Footer>
  )
}

const themes = [
  { ...defaultTheme, name: 'Default' },
  // materialTheme,
  wireframeTheme,
]
const themeTransitionPeriod = 3300

// First a display of moult comps just like mui.com
// Then theme switching
// Then depending on scrolling or not, show a different comp
function ComponentsDisplay() {
  const [mode] = useContext(ThemeModeContext)
  const [currentTheme, setCurrentTheme] = useState(themes[0])
  const nextTheme = useMemo(() => themes[(themes.indexOf(currentTheme) + 1) % themes.length], [currentTheme])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentTheme(nextTheme)
    }, themeTransitionPeriod)

    return () => clearTimeout(timeoutId)
  }, [nextTheme])

  const enhancedTheme = {
    ...currentTheme,
    mode,
    global: {
      ...currentTheme.global,
      defaultProps: {
        ...currentTheme.global?.defaultProps,
        transition: 'all 330ms ease',
      },
    },
  }

  return (
    <Div p={2}>
      <ThemeProvider theme={enhancedTheme}>
        <A
          userSelect="none"
          onClick={() => setCurrentTheme(nextTheme)}
        >
          Theme: {currentTheme.name}
        </A>
        <Div mt={2}>
          <Div xflex="x4">
            <Button>
              Submit
            </Button>
            <Button
              ml={1}
              variant="outlined"
            >
              Cancel
            </Button>
          </Div>
          <Input
            mt={2}
            display="block"
            placeholder="What's on your mind?"
          />
          <Div mt={2}>
            <IconButton color="primary">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </IconButton>
          </Div>
        </Div>
      </ThemeProvider>
    </Div>
  )
}

export default Home
