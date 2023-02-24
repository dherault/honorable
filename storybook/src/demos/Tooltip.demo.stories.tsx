// Icons from https://icons.modulz.app/
import React, { useState } from 'react'
import { A, Tooltip } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Tooltip',
  component: Tooltip,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-progressbar--basic&viewMode=story
// START-SOURCE
function TooltipBasic() {
  const [progress, setProgress] = useState(0.25)

  return (
    <>
      <A
        onClick={() => setProgress(x => (x + 0.25) % 1.0001)}
        userSelect="none"
      >
        Progress
      </A>
      <Tooltip
        mt={1}
        value={progress}
      />
    </>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = TooltipBasic.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-progressbar--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <Tooltip
      value="0.25"
      {...args}
    />
  ),
  'Tooltip',
  []
).bind({}) as any
Parts.args = {}
