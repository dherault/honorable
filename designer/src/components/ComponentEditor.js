import { useContext, useEffect, useState } from 'react'
import { Button, Div, H3, P, useTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'
import Editor from '@monaco-editor/react'

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
\t\t${key},
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

function stringifyDefaultStyles(defaultStyles) {
  if (!(defaultStyles && typeof defaultStyles === 'object')) {
    return `({
\t// Write some javascript styles here:
\t// color: 'blue',
})`
  }

  return `({
${stringify(defaultStyles).split('\n').filter((_, i, a) => !(i === 0 || i === a.length - 1)).join('\n')}
})`
}

function unstringifyDefaultStyles(defaultStyles = '', defaultValue = {}) {
  if (!(defaultStyles && typeof defaultStyles === 'string')) {
    return {}
  }

  try {
    return eval(defaultStyles)
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
  const [defaultStyles, setDefaultStyles] = useState(stringifyDefaultStyles(theme[componentName]?.defaultStyles))
  const [customProps, setCustomProps] = useState(stringifyCustomProps(theme[componentName]?.customProps))
  const previousDefaultStyles = usePrevious(defaultStyles)
  const previousCustomProps = usePrevious(customProps)
  const [isThemeRehydrated, setIsThemeRehydrated] = useState(false)

  useEffect(() => {
    if (defaultStyles === previousDefaultStyles && customProps === previousCustomProps) return

    try {
      const resolvedDefaultStyles = unstringifyDefaultStyles(defaultStyles, theme[componentName]?.defaultStyles)
      const resolvedCustomProps = unstringifyCustomProps(customProps, theme[componentName]?.customProps)

      setTheme({
        ...theme,
        [componentName]: {
          ...theme[componentName],
          defaultStyles: resolvedDefaultStyles && typeof resolvedDefaultStyles === 'object' && Object.keys(resolvedDefaultStyles).length ? resolvedDefaultStyles : undefined,
          customProps: resolvedCustomProps instanceof Map && resolvedCustomProps.size ? resolvedCustomProps : undefined,
        },
      })
    }
    catch (error) {
      //
    }
  }, [defaultStyles, previousDefaultStyles, customProps, previousCustomProps, componentName, setTheme, theme])

  useEffect(() => {
    if (theme.rehydrated && !isThemeRehydrated) {
      setDefaultStyles(stringifyDefaultStyles(theme[componentName]?.defaultStyles))
      setCustomProps(stringifyCustomProps(theme[componentName]?.customProps))
      setIsThemeRehydrated(true)
    }
  }, [componentName, theme, isThemeRehydrated])

  useEffect(() => onThemeReset(theme => {
    setDefaultStyles(stringifyDefaultStyles(theme[componentName]?.defaultStyles))
    setCustomProps(stringifyCustomProps(theme[componentName]?.customProps))
  }), [componentName, onThemeReset])

  function handleReset() {
    setDefaultStyles(stringifyDefaultStyles(defaultTheme[componentName]?.defaultStyles))
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
              defaultStyles:
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
              value={defaultStyles}
              onChange={value => setDefaultStyles(value)}
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
