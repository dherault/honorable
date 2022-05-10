import React, { useState } from 'react'
import { A, Div, Tooltip } from 'honorable'

export default {
  title: 'Tooltip',
  component: Tooltip,
}

const placements = [
  'bottom-end',
  'bottom-start',
  'bottom',
  'left-end',
  'left-start',
  'left',
  'right-end',
  'right-start',
  'right',
  'top-end',
  'top-start',
  'top',
]

function Template(args: any) {
  const [placement, setPlacement] = useState(placements[0])

  return (
    <Div xflex="y2">
      <Tooltip
        {...args}
        placement={placement}
      >
        <Div
          userSelect="none"
          minWidth={128 + 64}
          minHeight={128 + 64}
          p={2}
          xflex="x5"
          backgroundColor="background-light"
          onClick={() => setPlacement(placements[(placements.indexOf(placement) + 1) % placements.length])}
        >
          {placement}
        </Div>
      </Tooltip>
    </Div>
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'Tooltip',
}

export const Arrow = Template.bind({})
Arrow.args = {
  arrow: true,
  label: 'Tooltip',
}
