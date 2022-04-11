import { useContext, useEffect, useRef, useState } from 'react'
import { Button, Div, H3, Input, P, Pre, useTheme } from 'honorable'
import Editor from '@monaco-editor/react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import usePrevious from '../hooks/usePrevious'
import UserThemeContext from '../contexts/UserThemeContext'
import capitalize from '../utils/capitalize'

function stringifyCustomProps(customProps = {}) {
  return customProps

  return Object.fromEntries(Object.entries(customProps).map(([key, value]) => [key, JSON.stringify(value, null, 2)]))
}

function unstringifyCustomProps(customProps = {}, defaultValue = {}) {
  return customProps

  return Object.fromEntries(Object.entries(customProps).map(([key, value]) => {
    try {
      return [key, JSON.parse(value)]
    }
    catch (e) {
      return [key, defaultValue]
    }
  }))
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
  const enhancedTheme = useTheme()
  const [theme, setTheme,, onThemeReset] = useContext(UserThemeContext)
  const themeInitialValue = useRef(theme[componentName])
  const [open, setOpen] = useState(false)
  const defaultPropsJson = JSON.stringify(theme[componentName]?.defaultProps || {}, null, 2)
  const [defaultProps, setDefaultProps] = useState(defaultPropsJson === '{}' ? defaultEditorValue : defaultPropsJson)
  const [customProps, setCustomProps] = useState(stringifyCustomProps(theme[componentName]?.customProps))
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
          customProps: unstringifyCustomProps(customProps, theme[componentName]?.customProps),
        },
      })
    }
    catch (error) {
      //
    }
  }, [defaultProps, previousDefaultProps, customProps, previousCustomProps, componentName, setTheme, theme])

  useEffect(() => onThemeReset(theme => {
    const defaultPropsJson = JSON.stringify(theme[componentName]?.defaultProps || {}, null, 2)

    setDefaultProps(defaultPropsJson === '{}' ? defaultEditorValue : defaultPropsJson)
    setCustomProps(stringifyCustomProps(theme[componentName]?.customProps))
  }), [componentName, onThemeReset])

  function handleReset() {
    const json = JSON.stringify(themeInitialValue.current?.defaultProps || {}, null, 2)

    setDefaultProps(json === '{}' ? defaultEditorValue : json)
    setCustomProps(stringifyCustomProps(themeInitialValue.current.customProps))
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
          mt={1}
          xflex="x5b"
        >
          <P>
            customProps:
          </P>
          <AiOutlineInfoCircle
            color={enhancedTheme.utils.resolveColor('text-light')}
            onClick={() => window.alert('Custom props are used to create visual behaviors based on props. The first input corresponds to the prop name, the second is a map from the prop possible value to the styles.')}
          />
        </Div>
        <Editor
          width="100%"
          height="calc(1.5rem * 4)"
          language="js"
          theme={theme.mode === 'light' ? 'light' : 'vs-dark'}
          options={editorOptions}
          value={customProps}
          onChange={value => setCustomProps(value)}
        />
        {/* <Button
          size="small"
          disabled={Object.keys(customProps).includes('')}
          onClick={() => setCustomProps(customProps => ({ ...customProps, '': defaultEditorValue }))}
        >
          Add another custom prop
        </Button> */}
      </>
    )
  }

  return (
    <>
      <Div xflex="x4">
        <H3 minWidth={32 + 16 + 8 + 4 + 2}>
          {'<'}{capitalize(componentName)}{' />'}
        </H3>
        <Div flexGrow={1} />
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
            xflex="x5b"
          >
            <P>
              defaultProps:
            </P>
            <AiOutlineInfoCircle
              color={enhancedTheme.utils.resolveColor('text-light')}
              onClick={() => window.alert('Default props are your component\'s main styles. They apply to all instances of the component and can be overriden with customProps or locally.')}
            />
          </Div>
          <Div
            width="100%"
            borderRadius={4}
            overflow="hidden"
          >

            <Editor
              width="100%"
              height="calc(1.75rem * 5)"
              language="json"
              theme={theme.mode === 'light' ? 'light' : 'vs-dark'}
              value={defaultProps}
              onChange={value => setDefaultProps(value)}
              options={editorOptions}
            />
          </Div>
          <Div mt={0.5}>
            {customProps && customProps.size > 0 ? renderCustomProps() : renderNoCustomProps()}
          </Div>
        </>
      )}
    </>
  )
}

export default ComponentEditor
