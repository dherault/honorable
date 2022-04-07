import { Div } from 'honorable'
import { useLocation } from 'react-router-dom'

import TypographyThemeEditor from './TypographyThemeEditor'

const pathnameToComponent = {
  typography: TypographyThemeEditor,
}

function ThemeEditor({ theme = {}, setTheme = () => null }) {
  const pathname = useLocation().pathname.slice(1)

  function renderEditor() {
    const Component = pathnameToComponent[pathname]

    if (!Component) return null

    return (
      <Component
        theme={theme}
        setTheme={setTheme}
      />
    )
  }

  return (
    <Div
      width={512}
      maxHeight="calc(100vh - 64px)"
      overflowY="auto"
      borderRight="1px solid border"
      backgroundColor="background-light"
      flexShrink={0}
      mp="px-2 py-6"
    >
      {renderEditor()}
    </Div>
  )
}

export default ThemeEditor
