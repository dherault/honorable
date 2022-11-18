import React, { useState } from 'react'
import { Div, Flex, Tooltip } from 'honorable'

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

function Template4() {
  const nodes: any[] = []

  for (let i = 0; i < 4; i++) {
    nodes.push(
      <Tooltip
        key={i}
        arrow
        label={`Tooltip ${i}`}
        placement="bottom"
      >
        <Flex
          p={2}
          mt={2}
          align="center"
          justify="center"
          minWidth={32}
          minHeight={32}
          backgroundColor="background-light"
          userSelect="none"
        >
          Hover me!
        </Flex>
      </Tooltip>
    )
  }

  const divNodes: any[] = []

  for (let i = 0; i < 4; i++) {
    divNodes.push(
      <Div
        maxHeight={128}
        overflowY="scroll"
        backgroundColor="lightskyblue"
        p={1}
        mt={2}
      >
        {nodes}
      </Div>
    )
  }

  return (
    <>
      <Div
        maxHeight={512}
        overflowY="scroll"
        backgroundColor="red"
        p={1}
        mt={2}
      >
        {divNodes}
      </Div>
      <Div
        maxHeight={512}
        overflowY="scroll"
        backgroundColor="red"
        p={1}
        mt={2}
      >
        {divNodes}
      </Div>
      <Div
        maxHeight={512}
        overflowY="scroll"
        backgroundColor="red"
        p={1}
        mt={2}
      >
        {divNodes}
      </Div>
      <Div
        maxHeight={512}
        overflowY="scroll"
        backgroundColor="red"
        p={1}
        mt={2}
      >
        {divNodes}
      </Div>
    </>
  )
}

function Template5() {
  return (
    <Div
      position="relative"
      left={-256}
      backgroundColor="red"
      width={256}
      height={256}
    >
      <Tooltip
        arrow
        label="Tooltip"
        placement="bottom"
      >
        <Flex
          p={2}
          position="absolute"
          top={16}
          right={16}
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
    </Div>
  )
}

export const Default = Template.bind({}) as any
Default.args = {
  label: 'Tooltip',
}

export const Arrow = Template.bind({}) as any
Arrow.args = {
  arrow: true,
  label: 'Tooltip',
}

export const DisplayOnClick = Template.bind({}) as any
DisplayOnClick.args = {
  arrow: true,
  label: 'Tooltip',
  displayOn: ['click'],
}

export const OnOpen = Template2.bind({}) as any
OnOpen.args = {
  label: 'Tooltip',
}

export const ZIndex = Template3.bind({}) as any
ZIndex.args = {}

export const Padding = Template.bind({}) as any
Padding.args = {
  arrow: true,
  label: 'Tooltip',
  arrowPadding: 8,
  offsetPadding: 8,
  offset: 8,
}

export const Scrolling = Template4.bind({}) as any
Scrolling.args = {
}

export const PositionAbsolute = Template5.bind({}) as any
PositionAbsolute.args = {
}
