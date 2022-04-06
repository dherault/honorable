import { Div } from 'honorable'

function ThemeEditor({ collapsed = false, theme = {}, setTheme = () => null }) {
  return (
    <Div
      width="33%"
      height="100vh"
      borderRight="1px solid border"
      backgroundColor="background"
    >
      ThemeEditor
    </Div>
  )
}

export default ThemeEditor
