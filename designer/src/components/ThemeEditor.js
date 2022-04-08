import { Div } from 'honorable'
import { useLocation } from 'react-router-dom'

import TypographyThemeEditor from './TypographyThemeEditor'

const pathnameToEditorProps = {
  '/typography': {
    Component: TypographyThemeEditor,
    tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'],
    title: "Let's customize your typography",
  },
}

function ThemeEditor() {
  const { Component, tags, title } = pathnameToEditorProps[useLocation().pathname] || {}

  if (!Component) return null

  return (
    <Div
      width={512}
      maxHeight="calc(100vh - 64px)"
      overflowY="auto"
      backgroundColor="background-light"
      flexShrink={0}
      px={1}
      py={3}
      elevation={2}
    >
      <Component
        tags={tags}
        title={title}
      />
    </Div>
  )
}

export default ThemeEditor
