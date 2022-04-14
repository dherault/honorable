import { useState } from 'react'
import { A, Button, Div, H1, Icon, Pre, Span } from 'honorable'

function Home() {
  return (
    <HeroSection />
  )
}

function HeroSection() {
  return (
    <Div
      xflex="x4s"
      height="100vh"
    >
      <Div
        position="relative"
        flexGrow={1}
        xflex="y5"
        p={2}
        elevation={1}
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
      </Div>
      <Div
        width="calc(100vh * 3 / 4)"
        backgroundColor="background-light"
        flexShrink={0}
      >
        <ComponentsDisplay />
      </Div>
    </Div>
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
      {copied ? 'copied!'.padEnd(text.length, ' ') : text}
      <Span flexGrow={1} />
      <Icon
        ml={0.5}
        p={0.5}
        color="text-light"
        cursor="pointer"
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
      </Icon>
    </Pre>
  )
}

// First a display of moult comps just like mui.com
// Then theme switching
// Then depending on scrolling or not, show a different comp
function ComponentsDisplay() {
  return null
}

export default Home
