// Icons from https://icons.modulz.app/
import React from 'react'
import { Div } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Div',
  component: Div,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-div--basic&viewMode=story
// START-SOURCE
function DivBasicDemo() {
  return (
    <Div
      title="An Div"
      color="white"
      backgroundColor="tomato"
      padding={16}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est="borum.
    </Div>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = DivBasicDemo.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-div--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <Div {...args} />
  ),
  'Div',
  []
).bind({})
Parts.args = {
  title: 'An Div',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  color: 'white',
  backgroundColor: 'blue',
  padding: 16, 
}
