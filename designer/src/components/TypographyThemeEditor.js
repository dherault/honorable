import { useContext, useEffect, useState } from 'react'
import { Button, Div, H2, H3, Hr, Pre } from 'honorable'
import Editor from '@monaco-editor/react'

import usePrevious from '../hooks/usePrevious'
import UserThemeContext from '../contexts/UserThemeContext'

const concernedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre']

function TypographyThemeEditor() {

  return (
    <>
      <H2>
        Let's customize your typography
      </H2>
      <Div mp="mt-4">
        {concernedTags.map((tag, i) => (
          <>
            {i > 0 && <Hr mp="mt-2" />}
            <ComponentEditor
              key={tag}
              componentName={tag}
            />
          </>
        ))}
      </Div>
    </>
  )
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function ComponentEditor({ componentName }) {
  const [theme, setTheme, defaultTheme] = useContext(UserThemeContext)
  const [defaultProps, setDefaultProps] = useState(JSON.stringify(theme[componentName]?.defaultProps || {}, null, 2))
  const [customProps, setCustomProps] = useState(theme[componentName]?.customProps || {})
  const previousDefaultProps = usePrevious(defaultProps)

  useEffect(() => {
    if (defaultProps === previousDefaultProps) return

    try {
      setTheme({
        ...theme,
        [componentName]: {
          ...theme[componentName],
          defaultProps: JSON.parse(defaultProps),
        },
      })
    }
    catch (error) {
      //
    }
  }, [defaultProps, previousDefaultProps, componentName, setTheme, theme])

  function handleReset() {
    setDefaultProps(JSON.stringify(defaultTheme[componentName]?.defaultProps || {}, null, 2))
  }

  function renderNoCustomProps() {
    return (
      <Button size="small">
        Add custom props
      </Button>
    )
  }

  function renderCustomProps() {
    return null
  }

  return (
    <>
      <Div flexpad="x4">
        <H3>
          {capitalize(componentName)}
        </H3>
        <Button
          mp="ml-2"
          size="small"
          onClick={handleReset}
        >
          Reset
        </Button>
      </Div>
      <Pre
        mp="mt-2 mb-0h"
        display="block"
      >
        defaultProps:
      </Pre>
      <Editor
        width="100%"
        height="calc(1.5rem * 4)"
        language="json"
        theme={theme.mode === 'light' ? 'light' : 'vs-dark'}
        value={defaultProps}
        onChange={value => setDefaultProps(value)}
        options={{
          scrollBeyondLastLine: false,
          minimap: {
            enabled: false,
          },
        }}
      />
      <Div mp="mt-1">
        {Object.keys(customProps).length > 0 ? renderCustomProps() : renderNoCustomProps()}
      </Div>
    </>
  )
}

export default TypographyThemeEditor
