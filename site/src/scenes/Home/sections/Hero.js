import {
  A,
  Button,
  Div,
  H1,
  P,
  Section,
  Span,
} from 'honorable'

import CommandLinePre from '../../../components/CommandLinePre'

function HeroSection() {
  return (
    <Section
      p={2}
      px-mobile={1}
      xflex="y5"
      minHeight="calc(100vh - 60px)"
    >
      <Div
        mt={-8 - 6}
        mt-mobile={-4}
        xflex="y2s"
        maxWidth="65%"
      >
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
        <P
          mt={1}
          text="large"
        >
          Create your own code conventions,<br />for over x+ components.
        </P>
        <Div
          mt={2}
          xflex="x4s"
          display-tablet-down="block"
        >
          <Button
            as={A}
            size="large"
            href="https://docs.honorable.design/quick-start"
            target="_blank"
            rel="noreferer noopener"
            textDecoration="none"
            _hover={{
              textDecoration: 'none',
            }}
          >
            Get Started
          </Button>
          <CommandLinePre
            ml={2}
            ml-tablet-down={0}
            mt-tablet-down={1}
            flexGrow={1}
            maxWidth={361}
            width-tablet-down="100%"
          >
            npm i --save honorable honorable-theme-default @emotion/react @emotion/styled
          </CommandLinePre>
        </Div>
      </Div>
    </Section>
  )
}

export default HeroSection
