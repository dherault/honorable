import { useContext, useEffect, useState } from 'react'
import { Button, Div, H1, Modal, Pre } from 'honorable'
import Editor from '@monaco-editor/react'

import UserThemeContext from '../contexts/UserThemeContext'

import stringify from '../utils/stringify'

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

const sortedKeys = ['mode', 'font', 'colors', 'global']

function sortThemeKeys(theme) {
  const sortedTheme = {}

  Object.keys(theme)
  .sort((a, b) => {
    const aIndex = sortedKeys.indexOf(a)
    const bIndex = sortedKeys.indexOf(b)

    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b)
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1

    return aIndex - bIndex
  })
  .forEach(key => {
    sortedTheme[key] = theme[key]
  })

  return sortedTheme
}

const prefix = `// In theme.js
export default `
const suffix = `
`

function stringifyTheme(theme) {
  try {
    const clonedTheme = { ...theme }

    delete clonedTheme.rehydrated

    return `${prefix}${stringify(clonedTheme)}${suffix}`
  }
  catch (error) {
    return 'An error occured'
  }
}

function parseTheme(themeString) {
  const slicedThemeString = themeString.slice(prefix.length, -suffix.length)

  return eval(`(${slicedThemeString})`)
}

// TODO use Monaco
function ExportModal({ open, onClose }) {
  const [userTheme, setUserTheme] = useContext(UserThemeContext)
  const [modifiedTheme, setModifiedTheme] = useState(stringifyTheme(sortThemeKeys(userTheme)))
  const [copied, setCopied] = useState(false)

  function handleCopyClick() {
    navigator.clipboard.writeText(modifiedTheme)

    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 1200)
    }
  }, [copied])

  useEffect(() => {
    try {
      setUserTheme(parseTheme(modifiedTheme))
    }
    catch (error) {
      //
    }
  }, [modifiedTheme, setUserTheme])

  return (
    <Modal
      open={open}
      onClose={onClose}
      xflex="y2s"
      overflow="hidden"
      minWidth={512 + 256 + 64 + 32 + 16 + 8 + 4 + 2}
    >
      <Div
        pt={1}
        px={1}
        flexGrow={1}
        overflowY="auto"
      >
        <H1 mb={1}>
          Your theme:
        </H1>
        <Div
          width="100%"
          borderRadius={4}
          border="1px solid border"
          overflow="hidden"
        >
          <Editor
            width="100%"
            height="512px"
            language="javascript"
            theme={userTheme.mode === 'light' ? 'light' : 'vs-dark'}
            value={modifiedTheme}
            onChange={value => setModifiedTheme(value)}
            options={editorOptions}
          />
        </Div>
      </Div>
      <Div
        flexShrink={0}
        xflex="x6"
        p={1}
      >
        <Button
          variant="outlined"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          ml={1}
          minWidth={159}
          onClick={handleCopyClick}
        >
          {copied ? 'Copied!' : 'Copy to clipboard'}
        </Button>
      </Div>
    </Modal>
  )
}

export default ExportModal
