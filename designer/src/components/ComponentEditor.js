import { useContext, useEffect, useRef, useState } from 'react'
import { Button, Div, H3, Input, Pre } from 'honorable'
import Editor from '@monaco-editor/react'

import usePrevious from '../hooks/usePrevious'
import UserThemeContext from '../contexts/UserThemeContext'

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function stringifyMapValues(object) {
  const nextObject = {}

  Object.entries(object).forEach(([key, value]) => {
    nextObject[key] = new Map([...value.entries()].map(([k, v]) => [k, JSON.stringify(v, null, 2)]))
  })

  return nextObject
}

function unstringifyMapValues(object, defaultObject) {
  const nextObject = {}

  try {
    Object.entries(object).forEach(([key, value]) => {
      nextObject[key] = new Map([...value.entries()].map(([k, v]) => [k, JSON.parse(v)]))
    })

    return nextObject
  }
  catch (e) {
    return defaultObject
  }
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
  const [theme, setTheme, defaultTheme] = useContext(UserThemeContext)
  const themeInitialValue = useRef(theme[componentName])
  const [open, setOpen] = useState(false)
  const defaultPropsJson = JSON.stringify(theme[componentName]?.defaultProps || {}, null, 2)
  const [defaultProps, setDefaultProps] = useState(defaultPropsJson === '{}' ? defaultEditorValue : defaultPropsJson)
  const [customProps, setCustomProps] = useState(stringifyMapValues(theme[componentName]?.customProps) || {})
  const previousDefaultProps = usePrevious(defaultProps)
  const previousCustomProps = usePrevious(customProps)

  useEffect(() => {
    if (defaultProps === previousDefaultProps && customProps === previousCustomProps) return

    try {
      setTheme({
        ...theme,
        [componentName]: {
          ...theme[componentName],
          defaultProps: JSON.parse(defaultProps),
          customProps: unstringifyMapValues(customProps, theme[componentName]?.customProps || {}),
        },
      })
    }
    catch (error) {
      //
    }
  }, [defaultProps, previousDefaultProps, customProps, previousCustomProps, componentName, setTheme, theme])

  function handleReset() {
    const json = JSON.stringify(themeInitialValue.current?.defaultProps || {}, null, 2)
    setDefaultProps(json === '{}' ? defaultEditorValue : json)
    setCustomProps(stringifyMapValues(themeInitialValue.current.customProps || {}))
  }

  function handleClear() {
    setDefaultProps(defaultEditorValue)
    setCustomProps({})
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
          <Div
            mb={1}
            key={i}
          >
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
                xflex="x4s"
                flexGrow={1}
                mb={0.5}
              >
                <Div
                  xflex="y1"
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
                  <Div
                    mt={0.5}
                    xflex="x4"
                  >
                    <Button
                      size="small"
                      padding="0.15rem 0.5rem 0.075rem 0.5rem"
                      onClick={() => setCustomProps(customProps => {
                        const nextCustomProps = { ...customProps }
                        const nextMap = new Map(map)

                        nextMap.delete(mapKey)

                        if (nextMap.size) {
                          nextCustomProps[key] = nextMap
                        }
                        else {
                          delete nextCustomProps[key]
                        }

                        return nextCustomProps
                      })}
                    >
                      -
                    </Button>
                    {i === map.size - 1 && (
                      <Button
                        ml={0.5}
                        size="small"
                        padding="0.15rem 0.5rem 0.075rem 0.5rem"
                        onClick={() => setCustomProps(customProps => {
                          const nextCustomProps = { ...customProps }
                          const nextMap = new Map(map)

                          nextMap.set('', defaultEditorValue)

                          nextCustomProps[key] = nextMap

                          return nextCustomProps
                        })}
                      >
                        +
                      </Button>
                    )}
                  </Div>
                </Div>
                <Pre mx={0.5}>
                  →
                </Pre>
                <Div
                  width="100%"
                  borderRadius={4}
                  overflow="hidden"
                >
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
              </Div>
            ))}
          </Div>
        ))}
        <Button
          size="small"
          onClick={() => setCustomProps(customProps => ({ ...customProps, '': new Map([['', defaultEditorValue]]) }))}
        >
          Add another custom prop
        </Button>
      </>
    )
  }

  return (
    <>
      <Div xflex="x4">
        <H3 minWidth={32 + 16 + 8 + 4 + 2}>
          {'<'}{capitalize(componentName)}{' />'}
        </H3>
        <Button
          ml={1}
          size="small"
          onClick={() => setOpen(open => !open)}
        >
          {open ? 'Hide' : 'Customize'}
        </Button>
        {open && (
          <>
            <Button
              ml={0.5}
              size="small"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              ml={0.5}
              size="small"
              onClick={handleClear}
            >
              Clear
            </Button>
          </>
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
          <Div
            width="100%"
            borderRadius={4}
            overflow="hidden"
          >

            <Editor
              width="100%"
              height="calc(1.5rem * 4)"
              language="json"
              theme={theme.mode === 'light' ? 'light' : 'vs-dark'}
              value={defaultProps}
              onChange={value => setDefaultProps(value)}
              options={editorOptions}
            />
          </Div>
          <Div mt={0.5}>
            {Object.keys(customProps).length > 0 ? renderCustomProps() : renderNoCustomProps()}
          </Div>
        </>
      )}
    </>
  )
}

export default ComponentEditor
