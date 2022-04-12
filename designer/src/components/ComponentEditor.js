import { useContext, useEffect, useState } from 'react'
import { Button, Div, H3, P, useTheme } from 'honorable'
import Editor from '@monaco-editor/react'

import defaultTheme from '../defaultTheme'
import usePrevious from '../hooks/usePrevious'
import UserThemeContext from '../contexts/UserThemeContext'
import capitalize from '../utils/capitalize'
import stringify from '../utils/stringify'

function stringifyCustomProps(customProps) {
  if (!(customProps && customProps instanceof Map)) {
    return ''
  }

  return `// customProps are maps from functions on props to styles,
// If the function returns truthy, the styles apply.
new Map([
${Array.from(customProps.entries()).map(([key, value = '']) => `\t[
\t\t${typeof key === 'function' ? (key?.stringValue || key) : ''},
\t\t${stringify(value).split('\n').join('\n\t\t')},
\t],`).join('\n')}
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
\t// Write some javascript styles here:
\t// color: 'blue',
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
        <P
          mb={0.25}
          mt={1}
        >
          customProps:
        </P>
        <Div
          width="100%"
          borderRadius={4}
          border="1px solid border"
          overflow="hidden"
        >
          <Editor
            width="100%"
            height="calc(2rem * 6)"
            language="javascript"
            theme={theme.mode === 'light' ? 'light' : 'vs-dark'}
            options={editorOptions}
            value={customProps}
            onChange={value => setCustomProps(value)}
          />
        </Div>
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
        {open && (
          <Button
            ml={1}
            size="small"
            onClick={handleReset}
            variant="outlined"
          >
            Reset
          </Button>
        )}
        <Button
          ml={open ? 0.5 : 1}
          size="small"
          onClick={() => setOpen(open => !open)}
        >
          {open ? 'Hide' : 'Customize'}
        </Button>
      </Div>
      {open && (
        <>
          <Div
            mb={0.25}
            mt={0.5}
          >
            <P>
              defaultProps:
            </P>
          </Div>
          <Div
            width="100%"
            borderRadius={4}
            border="1px solid border"
            overflow="hidden"
          >
            <Editor
              width="100%"
              height="calc(2rem * 6)"
              language="javascript"
              theme={theme.mode === 'light' ? 'light' : 'vs-dark'}
              value={defaultProps}
              onChange={value => setDefaultProps(value)}
              options={editorOptions}
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
