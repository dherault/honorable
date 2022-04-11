import { Div, H2 } from 'honorable'

import ComponentEditor from './ComponentEditor'
import ColorEditor from './ColorEditor'

function ComponentsThemeEditor({ tags = [], colors = [], title, infoStart, infoEnd }) {
  return (
    <>
      <H2>
        {title}
      </H2>
      {infoStart}
      <Div mt={4}>
        {colors.map((colorName, i) => (
          <Div
            key={i}
            mt={2}
          >
            <ColorEditor colorName={colorName} />
          </Div>
        ))}
        {tags.map(tag => (
          <Div
            key={tag}
            mt={2}
          >
            <ComponentEditor componentName={tag} />
          </Div>
        ))}
      </Div>
      {infoEnd}
    </>
  )
}

export default ComponentsThemeEditor
