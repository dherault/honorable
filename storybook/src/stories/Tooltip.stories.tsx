import React, { useState } from 'react'
import { Flex, Tooltip } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Components/Tooltip',
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

function Template3() {
  return (
    <>
      <Tooltip
        arrow
        label="Tooltip"
        placement="bottom"
      >
        <Flex
          p={2}
          align="center"
          justify="center"
          minWidth={128 + 64}
          minHeight={128 + 64}
          backgroundColor="background-light"
          userSelect="none"
        >
          Hover me!
        </Flex>
      </Tooltip>
      <Flex
        backgroundColor="red"
        width="100%"
        height={64}
      />
    </>
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

export const OnOpen = Template2.bind({})
OnOpen.args = {
  label: 'Tooltip',
}

export const ZIndex = Template3.bind({})
ZIndex.args = {}
