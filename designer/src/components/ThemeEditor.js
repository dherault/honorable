import { Div } from 'honorable'

function ThemeEditor({ collapsed = false, theme = {}, setTheme = () => null }) {
  return (
    <Div
      width={512}
      height="100vh"
      borderRight="1px solid border"
      backgroundColor="background-light"
      flexShrink={0}
    >
      ThemeEditor
    </Div>
  )
}

export default ThemeEditor
