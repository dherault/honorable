import { CssBaseline, ThemeProvider } from 'honorable'
import defaultTheme from 'honorable-theme-default'

function HonorableDecorator(Story) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  )
}

export default HonorableDecorator
