import { useState } from 'react'

import { A, ProgressBar } from 'honorable'

export default {
  title: 'ProgressBar',
  component: ProgressBar,
}

function Template(args) {
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

export const Default = Template.bind({})
Default.args = {
}
