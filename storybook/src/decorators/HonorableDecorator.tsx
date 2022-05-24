import React, { useState } from 'react'
// eslint-disable-next-line
import { Story as StoryType, StoryContext } from '@storybook/react'
import { CssBaseline, Div, Flex, Span, Switch, ThemeProvider, mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'

const theme = mergeTheme(defaultTheme, {
  // Fix storybook body padding
  html: [
    {
      '& > body': {
        padding: '0 !important',
      },
    },
  ],
})

const titleToBackgroundColor = {
  Accordion: 'background-light',
  'Accordion Demo': 'background-light',
}

function HonorableDecorator(Story: StoryType, { title }: StoryContext) {
  const [mode, setMode] = useState('light')

  return (
    <ThemeProvider theme={mergeTheme(theme, { mode })}>
      <CssBaseline />
      <Div
        py={2}
        px={4}
        height="100vh"
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
          top="0.5rem"
          right="0.5rem"
        />
        <Flex
          direction="column"
          align="center"
          pt={2}
        >
          <Story />
        </Flex>
      </Div>
    </ThemeProvider>
  )
}

export default HonorableDecorator
