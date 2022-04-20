import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  A,
  Button,
  Div,
  Footer,
  H1,
  H2,
  IconButton,
  P,
  Section,
  Span,
} from 'honorable'
import { AiFillGithub } from 'react-icons/ai'

import ShowcaseContext from '../contexts/ShowcaseContext'

import Showcase from '../components/Showcase'
import CodeBlock from '../components/CodeBlock'
import ThemeSwitch from '../components/ThemeSwitch'
import CommandLinePre from '../components/CommandLinePre'

function Home() {
  const [showcase, setShowcase] = useState('default')
  const showcaseValue = useMemo(() => [showcase, setShowcase], [showcase])

  return (
    <ShowcaseContext.Provider value={showcaseValue}>
      <Div
        xflex="x4s"
        maxWidth="100vw"
        position="relative"
      >
        <Div
          elevation={1}
          zIndex={10}
          flexBasis="calc(100vw - 100vh * 3 / 4)"
          flexShrink={1}
          position="relative"
          maxWidth="100%"
        >
          <ScrollListener showcase="default">
            <HeroSection />
          </ScrollListener>
          <ScrollListener showcase="square">
            <DemoSection />
          </ScrollListener>
          <ScrollListener showcase="design">
            <DesignSection />
          </ScrollListener>
          <ScrollListener showcase="docs">
            <ThemeDocsSection />
          </ScrollListener>
          <FooterSection />
        </Div>
        <Div
          position="relative"
          flexGrow={1}
          backgroundColor="background-light"
          display-tablet="none"
        >
          <Div
            position="sticky"
            top={0}
            right={0}
            width="100%"
            height="100vh"
          >
            <Showcase />
          </Div>
        </Div>
        <ThemeSwitch
          position="fixed"
          right="2rem"
          top="2rem"
          zIndex={1000}
        />
        <Div
          xflex="x6"
          position="fixed"
          bottom="2rem"
          right="2rem"
          zIndex={1000}
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
    </ShowcaseContext.Provider>
  )
}

// https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling
function isScrolledIntoView(element) {
  const rect = element.getBoundingClientRect()
  const elementTop = rect.top
  const elementBottom = rect.bottom

  return elementTop >= 0 && elementBottom <= window.innerHeight
}

function ScrollListener({ showcase, children }) {
  const scrolledRef = useRef()
  const [, setShowcase] = useContext(ShowcaseContext)

  useEffect(() => {
    function handleScroll() {
      if (isScrolledIntoView(scrolledRef.current)) {
        setShowcase(showcase)
      }
    }

    document.addEventListener('scroll', handleScroll)

    return () => document.removeEventListener('scroll', handleScroll)
  }, [showcase, setShowcase])

  return (
    <Div
      position="relative"
      flexShrink={1}
    >
      {children}
      <Div
        ref={scrolledRef}
        position="absolute"
        top="50%"
        right={0}
      />
    </Div>
  )
}

function HeroSection() {
  return (
    <Section
      p={2}
      px-mobile={1}
      xflex="y5"
      minHeight="100vh"
    >
      <Div
        mt={-8}
        mt-mobile={-4}
        xflex="y2s"
        maxWidth="100%"
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
        <Div
          xflex="x4s"
          display-mobile="block"
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
          <CommandLinePre
            ml={2}
            ml-mobile={0}
            mt-mobile={1}
            flexGrow={1}
            maxWidth={360}
            width-mobile="100%"
          >
            npm i --save honorable honorable-theme-default @emotion/react @emotion/styled
          </CommandLinePre>
        </Div>
      </Div>
    </Section>
  )
}

const createCode = code => `import { A, Article, Button, Div, H3, Icon, Img, P } from 'honorable'

function UserCard({ user = {}, ...props }) {
  return (${code}
  )
}`

const codeText = `
    <Article
      padding="1rem"
      border="1px solid border"
      borderRadius={4}
      backgroundColor="background"
      {...props}
    >
      <Div display="flex">
        <Img
          src="/images/user.jpeg"
          width={64}
          borderRadius={4}
        />
        <Div marginLeft="1rem">
          <H3>
            {user.name}
          </H3>
          <P
            marginTop="0.25rem"
            color="text-light"
          >
            {user.email}
          </P>
        </Div>
      </Div>
      <Div
        marginTop="1rem"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <A>
          <Icon marginRight="0.5rem">
            <MessageIcon />
          </Icon>
          Message
        </A>
        <Button marginLeft="1rem">
          Hire
        </Button>
      </Div>
    </Article>`

const codeTextShorthands = `
    <Article
      p={1}
      border="1px solid border"
      borderRadius={4}
      backgroundColor="background"
      {...props}
    >
      <Div xflex="x4">
        <Img
          src="/images/user.jpeg"
          width={64}
          borderRadius={4}
        />
        <Div ml={1}>
          <H3>
            {user.name}
          </H3>
          <P
            mt={0.25}
            color="text-light"
          >
            {user.email}
          </P>
        </Div>
      </Div>
      <Div
        mt={1}
        xflex="x5b"
      >
        <A>
          <Icon mr={0.5}>
            <MessageIcon />
          </Icon>
          Message
        </A>
        <Button ml={1}>
          Hire
        </Button>
      </Div>
    </Article>`

function DemoSection() {
  return (
    <Section
      container
      py={8}
      px-mobile={1}
      minHeight="100vh"
      xflex="y2"
    >
      <H2>
        HTML tags and CSS, that's it.
      </H2>
      <P
        text="large"
        mt={4}
      >
        Import any HTML tag as a component:
      </P>
      <CodeBlock mt={1}>
        {"import { Div } from 'honorable'"}
      </CodeBlock>
      <P
        text="large"
        mt={2}
      >
        Pass CSS as props:
      </P>
      <CodeBlock mt={1}>
        {`<Div
  width={64}
  height={64}
  borderRadius={4}
/>`}
      </CodeBlock>
      <P
        text="large"
        mt={2}
      >
        Use variables and custom props from your theme anywhere:
      </P>
      <CodeBlock mt={1}>
        {`<Div
  // ...
  backgroundColor="primary"
  elevation={2}
/>`}
      </CodeBlock>
    </Section>
  )
}

function DesignSection() {
  return (
    <Section
      container
      pt={4}
      pb={6}
      px-mobile={1}
    >
      <H2
        textAlign="center"
      >
        Designed to create fast, accessible React apps
      </H2>
      <DesignSectionItem
        mt={3}
        icon="0️⃣"
        action={(
          <A userSelect="none">
            Show me how to create my own conventions!
          </A>
        )}
      >
        Honorable's props are convention-free by default, <br />which means a 0 learning curve if you already know CSS.
      </DesignSectionItem>
      <DesignSectionItem
        mt={3}
        icon="🔧"
        action={(
          <A userSelect="none">
            Display what a cool theme looks like!
          </A>
        )}
      >
        The theming API is simple, composable and inheritable.
      </DesignSectionItem>
      <DesignSectionItem
        icon="🫡"
        action={(
          <A userSelect="none">
            Amaze me with a fully keyboard accessible component!
          </A>
        )}
        mt={3}
      >
        Full keyboard navigation, managed focus, WAI-ARIA compliant.
      </DesignSectionItem>
      <DesignSectionItem
        mt={3}
        icon="📱"
        action={(
          <A userSelect="none">
            Pop out some small-screens code!
          </A>
        )}
      >
        Mobile-ready and responsive by nature.
      </DesignSectionItem>
    </Section>
  )
}

function DesignSectionItem({ children, icon = '👉', action = '', ...props }) {
  return (
    <Div
      xflex="x1s"
      text="large"
      backgroundColor="background"
      borderRadius={4}
      overflow="hidden"
      border="1px solid border"
      {...props}
    >
      <Span
        pt={1}
        pl={1}
      >
        {icon}
      </Span>
      <P
        py={1}
        ml={1}
      >
        {children}
        <Span
          text="normal"
          display="block"
          mt={1.5}
        >
          {action}
        </Span>
      </P>
      <Div flexGrow={1} />
      <Div
        ml={1}
        width={4}
        flexShrink={0}
        backgroundColor="primary"
      />
    </Div>
  )
}

function ThemeDocsSection() {
  return (
    <Section
      container
      py={8}
      px-mobile={1}
      minHeight="100vh"
      xflex="y1s"
    >
      <H2
        pt={2}
        textAlign="center"
      >
        Document your design system easily
      </H2>
      <P
        mt={3}
        text="large"
      >
        Honorable has a utility to convert your theme into usable documentation.
      </P>
      <P
        text="large"
        mt={0.5}
      >
        Perfect for teams. 👌
      </P>
      <CommandLinePre mt={3}>
        npx honorable-documentation ./src/theme.js --out ./design-system
      </CommandLinePre>
    </Section>
  )
}

function FooterSection() {
  return (
    <Footer
      mt={6}
      py={2}
      px={4}
      px-mobile={1}
      xflex="x4"
    >
      <P>
        MIT License
      </P>
      <Span flexGrow={1} />
      <P mr-mobile={3}>
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

export default Home
