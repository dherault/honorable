// Icons from https://icons.modulz.app/
import React from 'react'
import { Avatar, Skeleton } from 'honorable'

export default {
  title: 'Skeleton',
  component: Skeleton,
}

function Template(args: any) {
  return (
    <Skeleton {...args} />
  )
}

export const Default = Template.bind({})
Default.args = {
  width: 256,
  height: 256,
}

export const Line = Template.bind({})
Line.args = {
  variant: 'line',
}

export const Circular = Template.bind({})
Circular.args = {
  variant: 'circular',
  width: 64,
  height: 64,
}

export const CircularChildren = Template.bind({})
CircularChildren.args = {
  variant: 'circular',
  children: (
    <Avatar />
  ),
}

export const DefaultWave = Template.bind({})
DefaultWave.args = {
  animation: 'wave',
  width: 256,
  height: 256,
}

export const LineWave = Template.bind({})
LineWave.args = {
  animation: 'wave',
  variant: 'line',
}

export const CircularWave = Template.bind({})
CircularWave.args = {
  animation: 'wave',
  variant: 'circular',
  width: 64,
  height: 64,
}

export const CircularChildrenWave = Template.bind({})
CircularChildrenWave.args = {
  animation: 'wave',
  variant: 'circular',
  children: (
    <Avatar />
  ),
}

export const DefaultNoAmination = Template.bind({})
DefaultNoAmination.args = {
  animation: false,
  width: 256,
  height: 256,
}

export const LineNoAmination = Template.bind({})
LineNoAmination.args = {
  animation: false,
  variant: 'line',
}

export const CircularNoAmination = Template.bind({})
CircularNoAmination.args = {
  animation: false,
  variant: 'circular',
  width: 64,
  height: 64,
}

export const CircularChildrenNoAmination = Template.bind({})
CircularChildrenNoAmination.args = {
  animation: false,
  variant: 'circular',
  children: (
    <Avatar />
  ),
}
