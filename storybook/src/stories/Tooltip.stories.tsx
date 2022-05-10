import React, { useState } from 'react'
import { A, Div, Tooltip } from 'honorable'

export default {
  title: 'Tooltip',
  component: Tooltip,
}

const placements = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
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

function Template2(args: any) {
  const [open, setOpen] = useState(false)

  return (
    <Div xflex="y2">
      <Tooltip
        {...args}
        onOpen={(event, open) => setOpen(open)}
      >
        <Div
          userSelect="none"
          minWidth={128 + 64}
          minHeight={128 + 64}
          p={2}
          xflex="x5"
          backgroundColor="background-light"
        >
          {open ? 'open' : 'closed'}
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

export const DisplayOnClick = Template.bind({})
DisplayOnClick.args = {
  arrow: true,
  label: 'Tooltip',
  displayOn: ['click'],
}

export const onOpen = Template2.bind({})
onOpen.args = {
  label: 'Tooltip',
}
