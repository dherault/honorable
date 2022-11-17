// Icons from https://icons.modulz.app/
import React, { useState } from 'react'
import { A, ProgressBar } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/ProgressBar',
  component: ProgressBar,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-progressbar--basic&viewMode=story
// START-SOURCE
function ProgressBarBasic() {
  const [progress, setProgress] = useState(0.25)

  return (
    <>
      <A
        onClick={() => setProgress(x => (x + 0.25) % 1.0001)}
        userSelect="none"
      >
        Progress
      </A>
      <ProgressBar
        mt={1}
        value={progress}
      />
    </>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = ProgressBarBasic.bind({}) as any

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-progressbar--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <ProgressBar
      value="0.25"
      {...args}
    />
  ),
  'ProgressBar',
  []
).bind({}) as any
Parts.args = {}
