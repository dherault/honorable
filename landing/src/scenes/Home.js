import { A, Button, Div, H1, Span } from 'honorable'

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
        flexGrow={1}
        xflex="y5"
        p={2}
        elevation={1}
      >
        <Div>
          <H1>
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
          <A
            mt={2}
            href="https://docs.honorable.design/quick-start"
            target="_blank"
            rel="noreferer noopener"
          >
            <Button size="large">
              Get Started
            </Button>
          </A>
        </Div>
      </Div>
      <Div
        width="calc(100vh * 3 / 4)"
        flexShrink={0}
        p={1}
      />
    </Div>
  )
}

export default Home
