import React, { useState } from 'react'

import { A, ProgressBar } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
}

function Template(args: any) {
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
        {...args}
      />
    </>
  )
}

export const Default = Template.bind({}) as any
Default.args = {
}
