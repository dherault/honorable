import { Div, H2, Sub } from 'honorable'

import ComponentEditor from './ComponentEditor'

function ComponentsThemeEditor({ tags, info, colors, title }) {
  return (
    <>
      <H2>
        {title}
      </H2>
      <Sub>
        {info}
      </Sub>
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

export default ComponentsThemeEditor
