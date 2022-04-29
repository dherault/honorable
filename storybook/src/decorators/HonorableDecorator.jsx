import { useState } from 'react'
import { A, CssBaseline, Div, ThemeProvider, mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'

function HonorableDecorator(Story) {
  const [mode, setMode] = useState('light')

  return (
    <ThemeProvider theme={mergeTheme(defaultTheme, { mode })}>
      <CssBaseline />
      <Div
        height="calc(100vh - 2rem)"
        position="relative"
      >
        <A
          position="absolute"
          bottom={0}
          right={0}
          userSelect="none"
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
        >
          {mode === 'light' ? 'Dark' : 'Light'}
        </A>
        <Story />
      </Div>
    </ThemeProvider>
  )
}

export default HonorableDecorator
