// Icons from https://icons.modulz.app/
import React from 'react'
import { Caret } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Caret',
  component: Caret,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-caret--basic&viewMode=story
// START-SOURCE
function CaretBasicDemo() {
  return (
    <Caret />
  )
}
// END-SOURCE
// END-DEMO

export const Basic = CaretBasicDemo.bind({})
export const Rotated = CaretBasicDemo.bind({})
Rotated.args = {
  rotation: -90,
}

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-caret--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <Caret {...args} />
  ),
  'Caret',
  []
).bind({})
Parts.args = {}
