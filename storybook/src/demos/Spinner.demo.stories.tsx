// Icons from https://icons.modulz.app/
import React from 'react'
import { Spinner } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Spinner',
  component: Spinner,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-spinner--basic&viewMode=story
// START-SOURCE
function SpinnerBasic() {
  return (
    <Spinner />
  )
}
// END-SOURCE
// END-DEMO

export const Basic = SpinnerBasic.bind({})

// START-DEMO
// @name Large
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-spinner--large&viewMode=story
// START-SOURCE
function SpinnerLarge() {
  return (
    <Spinner size={64} />
  )
}
// END-SOURCE
// END-DEMO

export const Large = SpinnerLarge.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-spinner--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <Spinner
      {...args}
    />
  ),
  'Spinner',
  []
).bind({})
Parts.args = {}
