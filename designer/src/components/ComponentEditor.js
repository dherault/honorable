import { useContext, useEffect, useState } from 'react'
import { Button, Div, H3, P, useTheme } from 'honorable'
import Editor from '@monaco-editor/react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import defaultTheme from '../defaultTheme'
import usePrevious from '../hooks/usePrevious'
import UserThemeContext from '../contexts/UserThemeContext'
import capitalize from '../utils/capitalize'

function stringify(object, pad = '  ') {
  if (typeof object === 'object') {
    let stringified = '{\n'

    Object.entries(object).forEach(([key, value]) => {
      const wrappedKey = key.match(/^[a-zA-Z][a-zA-Z0-9]*$/) ? key : `'${key.replaceAll("'", "\\'")}'`

      stringified += `${pad}${wrappedKey}: ${stringify(value, `${pad}  `)},\n`
    })

    return `${stringified}}`
  }
  if (typeof object === 'string') {
    return `'${object.replaceAll("'", "\\'")}'`
  }

  return JSON.stringify(object, null, 2)
}

function stringifyCustomProps(customProps) {
  if (!(customProps && customProps instanceof Map)) {
    return ''
  }

  return `new Map([
${Array.from(customProps.entries()).map(([key, value = '']) => `\t[
\t\t${typeof key === 'function' ? (key?.stringValue || key) : ''},
\t\t${stringify(value).split('\n').join('\n\t\t')},
\t]`).join(',\n')}
])`
}

function unstringifyCustomProps(customProps = '', defaultValue = new Map()) {
  if (!(customProps && typeof customProps === 'string')) {
    return {}
  }

  try {
    return eval(customProps)
  }
  catch (error) {
    return defaultValue
  }
}

function stringifyDefaultProps(defaultProps) {
  if (!(defaultProps && typeof defaultProps === 'object')) {
    return `({
\t
})`
  }

  return `({
${stringify(defaultProps).split('\n').filter((_, i, a) => !(i === 0 || i === a.length - 1)).join('\n')}
})`
}

function unstringifyDefaultProps(defaultProps = '', defaultValue = {}) {
  if (!(defaultProps && typeof defaultProps === 'string')) {
    return {}
  }

  try {
    return eval(defaultProps)
  }
  catch (error) {
    return defaultValue
  }
}

const defaultNewCustomProps = new Map([[(props, theme) => true, {}]])

const editorOptions = {
  scrollBeyondLastLine: false,
  minimap: {
    enabled: false,
  },
  lineNumbers: 'off',
  glyphMargin: false,
  folding: false,
  // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0,
  renderLineHighlight: 'none',
  lightbulb: {
    enabled: false,
  },
  quickSuggestions: false,
}

function ComponentEditor({ componentName }) {
  const enhancedTheme = useTheme()
  const [theme, setTheme,, onThemeReset] = useContext(UserThemeContext)
  const [open, setOpen] = useState(false)
  const [defaultProps, setDefaultProps] = useState(stringifyDefaultProps(theme[componentName]?.defaultProps))
  const [customProps, setCustomProps] = useState(stringifyCustomProps(theme[componentName]?.customProps))
  const previousDefaultProps = usePrevious(defaultProps)
  const previousCustomProps = usePrevious(customProps)
  const [isThemeRehydrated, setIsThemeRehydrated] = useState(false)

  useEffect(() => {
    if (defaultProps === previousDefaultProps && customProps === previousCustomProps) return

    try {
      const resolvedDefaultProps = unstringifyDefaultProps(defaultProps, theme[componentName]?.defaultProps)
      const resolvedCustomProps = unstringifyCustomProps(customProps, theme[componentName]?.customProps)

      setTheme({
        ...theme,
        [componentName]: {
          ...theme[componentName],
          defaultProps: resolvedDefaultProps && typeof resolvedDefaultProps === 'object' && Object.keys(resolvedDefaultProps).length ? resolvedDefaultProps : undefined,
          customProps: resolvedCustomProps instanceof Map && resolvedCustomProps.size ? resolvedCustomProps : undefined,
        },
      })
    }
    catch (error) {
      //
    }
  }, [defaultProps, previousDefaultProps, customProps, previousCustomProps, componentName, setTheme, theme])

  useEffect(() => {
    if (theme.rehydrated && !isThemeRehydrated) {
      setDefaultProps(stringifyDefaultProps(theme[componentName]?.defaultProps))
      setCustomProps(stringifyCustomProps(theme[componentName]?.customProps))
      setIsThemeRehydrated(true)
    }
  }, [componentName, theme, isThemeRehydrated])

  useEffect(() => onThemeReset(theme => {
    setDefaultProps(stringifyDefaultProps(theme[componentName]?.defaultProps))
    setCustomProps(stringifyCustomProps(theme[componentName]?.customProps))
  }), [componentName, onThemeReset])

  function handleReset() {
    setDefaultProps(stringifyDefaultProps(defaultTheme[componentName]?.defaultProps))
    setCustomProps(stringifyCustomProps(defaultTheme[componentName]?.customProps))
  }

  function handleClear() {
    setDefaultProps(stringifyDefaultProps())
    setCustomProps(stringifyCustomProps())
  }

  function handleEditorWillMount(monaco) {
    monaco.languages.javascript.setDiagnosticsOptions({
      diagnosticCodesToIgnore: [1109],
    })
  }

  function renderNoCustomProps() {
    return (
      <Button
        size="small"
        onClick={() => setCustomProps(stringifyCustomProps(defaultNewCustomProps))}
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
        <Div
          width="100%"
          borderRadius={4}
          border="1px solid border"
          overflow="hidden"
        >
          <Editor
            width="100%"
            height="calc(1.75rem * 6)"
            language="javascript"
            theme={theme.mode === 'light' ? 'light' : 'vs-dark'}
            options={editorOptions}
            value={customProps}
            onChange={value => setCustomProps(value)}
            handleEditorWillMount={handleEditorWillMount}
          />
        </Div>
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
            border="1px solid border"
            overflow="hidden"
          >

            <Editor
              width="100%"
              height="calc(1.75rem * 6)"
              language="javascript"
              theme={theme.mode === 'light' ? 'light' : 'vs-dark'}
              value={defaultProps}
              onChange={value => setDefaultProps(value)}
              options={editorOptions}
              handleEditorWillMount={handleEditorWillMount}
            />
          </Div>
          <Div mt={0.5}>
            {(theme[componentName]?.customProps?.size || 0) > 0 ? renderCustomProps() : renderNoCustomProps()}
          </Div>
        </>
      )}
    </>
  )
}

export default ComponentEditor
