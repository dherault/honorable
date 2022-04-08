import { Div, H2, Sub } from 'honorable'

import ComponentEditor from './ComponentEditor'
import ColorEditor from './ColorEditor'

function ComponentsThemeEditor({ tags = [], colors = [], title, infoStart, infoEnd }) {
  return (
    <>
      <H2>
        {title}
      </H2>
      <Sub
        display="block"
        mb={4}
      >
        {infoStart}
      </Sub>
      {colors.map(colorName => (
        <Div
          key={colorName}
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
      <Sub
        display="block"
        mt={4}
      >
        {infoEnd}
      </Sub>
    </>
  )
}

export default ComponentsThemeEditor
