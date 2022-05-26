import {
  A,
  Footer,
  P,
  Span,
} from 'honorable'

function FooterSection() {
  return (
    <Footer
      mt={6}
      py={2}
      px={4}
      px-mobile={1}
      xflex="x4"
    >
      <P flexShrink={0}>
        MIT License
      </P>
      <Span flexGrow={1} />
      <P
        ml={1}
        textAlign="right"
      >
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

export default FooterSection
