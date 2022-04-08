import { Fragment, useContext, useEffect, useState } from 'react'
import { Button, Div, H3, Input, Pre } from 'honorable'
import Editor from '@monaco-editor/react'

import usePrevious from '../hooks/usePrevious'
import UserThemeContext from '../contexts/UserThemeContext'

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const editorOptions = {
  scrollBeyondLastLine: false,
  minimap: {
    enabled: false,
  },
  // renderLineHighlight: 'none',
  lineNumbers: 'off',
  glyphMargin: false,
  folding: false,
  // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0,
}

const defaultEditorValue = `{
\t
}`

function ComponentEditor({ componentName }) {
  const [open, setOpen] = useState(false)
  const [theme, setTheme, defaultTheme] = useContext(UserThemeContext)
  const defaultPropsJson = JSON.stringify(theme[componentName]?.defaultProps || {}, null, 2)
  const [defaultProps, setDefaultProps] = useState(defaultPropsJson === '{}' ? defaultEditorValue : defaultPropsJson)
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
    setDefaultProps(defaultPropsJson === '{}' ? defaultEditorValue : defaultPropsJson)
  }

  function renderNoCustomProps() {
    return (
      <Button
        size="small"
        onClick={() => setCustomProps({ '': new Map([['', defaultEditorValue]]) })}
      >
        Add custom props
      </Button>
    )
  }

  function renderCustomProps() {
    return (
      <>
        <Div
          mb={0.25}
          mt={0.5}
        >
          customProps:
        </Div>
        {Object.entries(customProps)
        .sort(([keyA], [keyB]) => keyA - keyB)
        .map(([key, map], i) => (
          <Fragment key={i}>
            <Div xflex="x4">
              <Input
                width={84}
                value={key}
                onChange={event => setCustomProps(customProps => {
                  const nextCustomProps = { ...customProps }

                  delete nextCustomProps[key]

                  nextCustomProps[event.target.value] = map

                  return nextCustomProps
                })}
              />
              <Pre ml={0.5}>
                :
              </Pre>
            </Div>
            {[...map.entries()].map(([mapKey, mapValue], i) => (
              <Div
                key={i}
                xflex="x1"
                mt={0.5}
                flexGrow={1}
              >
                <Input
                  width={84}
                  value={mapKey}
                  onChange={event => setCustomProps(customProps => {
                    const nextCustomProps = { ...customProps }
                    const nextMap = new Map(map)

                    nextMap.delete(mapKey)
                    nextMap.set(event.target.value, mapValue)

                    nextCustomProps[key] = nextMap

                    return nextCustomProps
                  })}
                />
                <Pre mx={0.5}>
                  →
                </Pre>
                <Editor
                  width="100%"
                  height="calc(1.5rem * 4)"
                  language="json"
                  theme={theme.mode === 'light' ? 'light' : 'vs-dark'}
                  options={editorOptions}
                  value={mapValue}
                  onChange={value => setCustomProps(customProps => {
                    const nextCustomProps = { ...customProps }
                    const nextMap = new Map(map)

                    nextMap.set(mapKey, value)

                    nextCustomProps[key] = nextMap

                    return nextCustomProps
                  })}
                />
              </Div>
            ))}
          </Fragment>
        ))}
      </>
    )
  }

  return (
    <>
      <Div xflex="x4">
        <H3 minWidth={32}>
          {capitalize(componentName)}
        </H3>
        <Button
          ml={0.5}
          size={open ? 'small' : null}
          onClick={() => setOpen(open => !open)}
        >
          {open ? 'Hide' : 'Customize'}
        </Button>
        {open && (
          <Button
            ml={1}
            size="small"
            onClick={handleReset}
          >
            Reset
          </Button>
        )}
      </Div>
      {open && (
        <>
          <Div
            mb={0.25}
            mt={0.5}
          >
            defaultProps:
          </Div>
          <Editor
            width="100%"
            height="calc(1.5rem * 4)"
            language="json"
            theme={theme.mode === 'light' ? 'light' : 'vs-dark'}
            value={defaultProps}
            onChange={value => setDefaultProps(value)}
            options={editorOptions}
          />
          <Div mt={0.5}>
            {Object.keys(customProps).length > 0 ? renderCustomProps() : renderNoCustomProps()}
          </Div>
        </>
      )}
    </>
  )
}

export default ComponentEditor
