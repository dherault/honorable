import React, { useState } from 'react'
import { A, Div, Flex, Tooltip } from 'honorable'

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
    <Tooltip
      {...args}
      placement={placement}
    >
      <Flex
        p={2}
        align="center"
        justify="center"
        minWidth={128 + 64}
        minHeight={128 + 64}
        backgroundColor="background-light"
        userSelect="none"
        onClick={() => setPlacement(placements[(placements.indexOf(placement) + 1) % placements.length])}
      >
        {placement}
      </Flex>
    </Tooltip>
  )
}

function Template2(args: any) {
  const [open, setOpen] = useState(false)

  return (
    <Tooltip
      {...args}
      onOpen={(event, open) => setOpen(open)}
    >
      <Flex
        p={2}
        align="center"
        justify="center"
        userSelect="none"
        minWidth={128 + 64}
        minHeight={128 + 64}
        backgroundColor="background-light"
      >
        {open ? 'open' : 'closed'}
      </Flex>
    </Tooltip>
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
