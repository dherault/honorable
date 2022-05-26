import { useContext } from 'react'
import { Div } from 'honorable'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import highlighterStyleLight from 'react-syntax-highlighter/dist/esm/styles/prism/material-light'
import highlighterStyleDark from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark'

import ThemeModeContext from '../contexts/ThemeModeContext'

SyntaxHighlighter.registerLanguage('jsx', jsx)

function CodeBlock({ children, ...props }) {
  const [themeMode] = useContext(ThemeModeContext)

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

  return (
    <Div
      p={1}
      backgroundColor="background-light"
      border="1px solid border"
      borderRadius={4}
      overflowY="auto"
      position="relative"
      display="inline-block"
      {...props}
    >
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
