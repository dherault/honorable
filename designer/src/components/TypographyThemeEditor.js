import { Fragment, useContext, useEffect, useState } from 'react'
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
      <Div mt={2}>
        {concernedTags.map((tag, i) => (
          <Fragment key={tag}>
            {i > 0 && <Hr mt={1} />}
            <ComponentEditor
              key={tag}
              componentName={tag}
            />
          </Fragment>
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
      <Div xflex="x4">
        <H3>
          {capitalize(componentName)}
        </H3>
        <Button
          ml={1}
          size="small"
          onClick={handleReset}
        >
          Reset
        </Button>
      </Div>
      <Pre
        mt={1}
        mb={0.25}
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
      <Div mt={0.5}>
        {Object.keys(customProps).length > 0 ? renderCustomProps() : renderNoCustomProps()}
      </Div>
    </>
  )
}

export default TypographyThemeEditor
