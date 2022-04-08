import { Div, H2 } from 'honorable'

import ComponentEditor from './ComponentEditor'

function TypographyThemeEditor({ tags, title }) {

  return (
    <>
      <H2>
        {title}
      </H2>
      <Div mt={2}>
        {tags.map(tag => (
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
