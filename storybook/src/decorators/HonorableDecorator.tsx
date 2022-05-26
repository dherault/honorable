import React, { useState } from 'react'
// eslint-disable-next-line
import { Story as StoryType, StoryContext } from '@storybook/react'
import { CssBaseline, Div, Flex, Span, Switch, ThemeProvider, mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'

const theme = mergeTheme(defaultTheme, {
  // Fix storybook body padding
  stylesheet: {
    html: [
      {
        '& > body': {
          padding: '0 !important',
        },
      },
    ],
  },
  Switch: {
    Control: [
      ({ sunAndMoon }: any) => sunAndMoon && {
        backgroundColor: 'primary',
        fontSize: 18,
      },
    ],
    CheckedBackground: [
      ({ sunAndMoon }: any) => sunAndMoon && {
        paddingLeft: 4,
        paddingTop: 1,
      },
    ],
    UncheckedBackground: [
      ({ sunAndMoon }: any) => sunAndMoon && {
        paddingRight: 4,
        paddingTop: 1,
      },
    ],
  },
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
          sunAndMoon
          checkedBackground="🌜"
          uncheckedBackground="🌞"
          checked={mode === 'dark'}
          onChange={event => setMode(event.target.checked ? 'dark' : 'light')}
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
