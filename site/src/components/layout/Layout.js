import { A, Div, Flex, H3, Nav, Span } from 'honorable'
import { Link } from 'react-router-dom'

import ThemeSwitch from './ThemeSwitch'

function Layout({ children }) {
  return (
    <>
      <Nav
        as="nav"
        py={1}
        px={2}
        xflex="x4"
        position="fixed"
        top={0}
        width="100vw"
        background="linear-gradient(180deg, background 25%, transparent 100%)"
      >
        <H3
          as={Link}
          to="/"
          color="inherit"
          textDecoration="none"
          fontWeight={700}
        >
          🙏 <Span ml={0.25}>Honorable</Span>
        </H3>
        <A
          nav
          ml={2}
          as={Link}
          to="/docs/getting-started"
        >
          Docs
        </A>
        <Div flexGrow={1} />
        <ThemeSwitch />
      </Nav>
      {children}
    </>
  )
}

export default Layout
