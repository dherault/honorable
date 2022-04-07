import { Div, H2, H3 } from 'honorable'
import Editor from '@monaco-editor/react'

const concernedTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'Pre']

function TypographyThemeEditor({ theme, setTheme }) {

  return (
    <>
      <H2>
        Let's customize your typography
      </H2>
      <Div mp="mt-4">
        {concernedTags.map(tag => (
          <ComponentEditor
            key={tag}
            componentName={tag}
            theme={theme}
            setTheme={setTheme}
          />
        ))}
      </Div>
    </>
  )
}

function ComponentEditor({ componentName, theme, setTheme }) {
  return (
    <>
      <H3>
        {componentName}
      </H3>
      <Div flexpad="x1">
        <Editor
          height="256px"
          language="json"
          theme={theme.mode === 'light' ? 'light' : 'vs-dark'}
          value={JSON.stringify(theme[componentName] || { defaultProps: {}, customProps: {} }, null, 2)}
        />

      </Div>
    </>
  )
}

export default TypographyThemeEditor
