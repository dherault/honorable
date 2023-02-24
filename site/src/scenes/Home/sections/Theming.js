import { Button, Div, H2, Section } from 'honorable'

import JsxCodeBlock from '../../../components/JsxCodeBlock'

const code1 = `import { Div } from 'honorable'

// ...
<Div
  width={32}
  height={32}
  borderRadius="50%"
  backgroundColor="#00ff00"
/>
`

const code2 = `<Div
  size={32}
  borderRadius="half"
  backgroundColor="success"
/>
`

function ThemingSection() {
  return (
    <Section
      container
      maxWidth={512 + 256 + 128}
      height="100vh"
      xflex="y5s"
    >
      <Div xflex="x5b">
        <H2>
          Pass CSS as props
        </H2>
        <JsxCodeBlock
          width={256 + 128}
        >
          {code1}
        </JsxCodeBlock>
      </Div>
      <Div
        mt={4}
        xflex="x5b"
      >
        <H2>
          Create your own conventions
        </H2>
        <JsxCodeBlock
          width={256 + 128}
        >
          {code2}
        </JsxCodeBlock>
      </Div>
      <Div
        mt={4}
        xflex="x5b"
      >
        <H2>
          Use recipes
        </H2>
        <Div
          xflex="x5"
          width={256 + 128}
        >
          <Button size="large">
            Learn how to theme your app
          </Button>
        </Div>
      </Div>
    </Section>
  )
}

export default ThemingSection
