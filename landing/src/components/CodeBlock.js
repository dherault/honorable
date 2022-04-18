import { useContext, useState } from 'react'
import { Div } from 'honorable'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import highlighterStyleLight from 'react-syntax-highlighter/dist/esm/styles/prism/material-light'
import highlighterStyleDark from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark'

import ThemeModeContext from '../contexts/ThemeModeContext'

SyntaxHighlighter.registerLanguage('jsx', jsx)

function CodeBlock({ children, ...props }) {
  const [themeMode] = useContext(ThemeModeContext)
  const [clicked, setClicked] = useState(false)

  const highlighterStyle = themeMode === 'dark' ? highlighterStyleDark : highlighterStyleLight

  const customHighlighterStyle = {
    ...highlighterStyle,
    'code[class*="language-"]': {
      ...highlighterStyle['code[class*="language-"]'],
      background: 'transparent',
    },
    'pre[class*="language-"]': {
      ...highlighterStyle['pre[class*="language-"]'],
      background: 'transparent',
    },
  }

  const style = {
    '& > #code-block-click': {
      opacity: 0,
    },
    '&:hover > #code-block-click': {
      opacity: 1,
    },
  }

  return (
    <Div
      backgroundColor="background-light"
      border="1px solid border"
      borderRadius={4}
      overflowY={clicked ? 'scroll' : 'hidden'}
      position="relative"
      {...style}
      {...props}
      onClick={() => setClicked(true)}
    >
      {!clicked && (
        <Div
          id="code-block-click"
          position="absolute"
          top={0}
          right={0}
          p={1}
          color="primary"
          transition="opacity 150ms ease"
        >
          Click to scroll
        </Div>
      )}
      <SyntaxHighlighter
        language="jsx"
        style={customHighlighterStyle}
        customStyle={{
          fontSize: '14px',
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </SyntaxHighlighter>
    </Div>
  )
}

export default CodeBlock
