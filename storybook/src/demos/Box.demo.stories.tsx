// Icons from https://icons.modulz.app/
import React from 'react'
import { Box } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Box',
  component: Box,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-box--basic&viewMode=story
// START-SOURCE
function BoxDemo() {
  return (
    <>
      <Box
        width={128}
        height={128}
        backgroundColor="background-light"
      />
      <Box marginTop={16}>
        Box is an alias for Div
      </Box>
    </>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = BoxDemo.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-box--parts&viewMode=story
export const Parts = createPartsTemplate(
  Box,
  'Box',
  [],
).bind({})
Parts.args = {}
