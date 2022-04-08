import { Div, H2 } from 'honorable'

import ComponentEditor from './ComponentEditor'

const concernedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre']

function TypographyThemeEditor() {

  return (
    <>
      <H2>
        Let's customize your typography
      </H2>
      <Div mt={2}>
        {concernedTags.map(tag => (
          <Div
            key={tag}
            mb={2}
          >
            <ComponentEditor componentName={tag} />
          </Div>
        ))}
      </Div>
    </>
  )
}

export default TypographyThemeEditor
