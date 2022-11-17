// Icons from https://icons.modulz.app/
import React from 'react'
import { Avatar, Skeleton } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
}

function Template(args: any) {
  return (
    <Skeleton {...args} />
  )
}

export const Default = Template.bind({}) as any
Default.args = {
  width: 256,
  height: 256,
}

export const Line = Template.bind({}) as any
Line.args = {
  variant: 'line',
}

export const Circular = Template.bind({}) as any
Circular.args = {
  variant: 'circular',
  width: 64,
  height: 64,
}

export const CircularChildren = Template.bind({}) as any
CircularChildren.args = {
  variant: 'circular',
  children: (
    <Avatar />
  ),
}

export const DefaultWave = Template.bind({}) as any
DefaultWave.args = {
  animation: 'wave',
  width: 256,
  height: 256,
}

export const LineWave = Template.bind({}) as any
LineWave.args = {
  animation: 'wave',
  variant: 'line',
}

export const CircularWave = Template.bind({}) as any
CircularWave.args = {
  animation: 'wave',
  variant: 'circular',
  width: 64,
  height: 64,
}

export const CircularChildrenWave = Template.bind({}) as any
CircularChildrenWave.args = {
  animation: 'wave',
  variant: 'circular',
  children: (
    <Avatar />
  ),
}

export const DefaultNoAmination = Template.bind({}) as any
DefaultNoAmination.args = {
  animation: false,
  width: 256,
  height: 256,
}

export const LineNoAmination = Template.bind({}) as any
LineNoAmination.args = {
  animation: false,
  variant: 'line',
}

export const CircularNoAmination = Template.bind({}) as any
CircularNoAmination.args = {
  animation: false,
  variant: 'circular',
  width: 64,
  height: 64,
}

export const CircularChildrenNoAmination = Template.bind({}) as any
CircularChildrenNoAmination.args = {
  animation: false,
  variant: 'circular',
  children: (
    <Avatar />
  ),
}
