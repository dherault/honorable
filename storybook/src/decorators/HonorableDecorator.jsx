import { useState } from 'react'
import { CssBaseline, Div, Span, Switch, ThemeProvider, mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'

const theme = mergeTheme(defaultTheme, {
  // Fix storybook body padding
  html: {
    '& > body': {
      padding: '0 !important',
    },
  },
})

const titleToBackgroundColor = {
  Accordion: 'background-light',
}

function HonorableDecorator(Story, { title }) {
  const [mode, setMode] = useState('light')

  return (
    <ThemeProvider theme={mergeTheme(theme, { mode })}>
      <CssBaseline />
      <Div
        py={3}
        px={4}
        height="calc(100vh)"
        position="relative"
        backgroundColor={titleToBackgroundColor[title]}
      >
        <Switch
          checkedBackground={(
            <Span
              paddingLeft={4}
              paddingTop={1}
              fontSize={18}
            >
              🌜
            </Span>
          )}
          uncheckedBackground={(
            <Span
              paddingRight={4}
              paddingTop={1}
              fontSize={18}
            >
              🌞
            </Span>
          )}
          checked={mode === 'dark'}
          onChange={event => setMode(event.target.checked ? 'dark' : 'light')}
          backgroundColor="primary"
          position="absolute"
          top="1rem"
          right="1rem"
        />
        <Story />
      </Div>
    </ThemeProvider>
  )
}

export default HonorableDecorator
