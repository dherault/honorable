// Icons from https://icons.modulz.app/
import React from 'react'
import { Avatar } from 'honorable'

export default {
  title: 'Components/Avatar',
  component: Avatar,
}

function Template(args: any) {
  return (
    <Avatar {...args} />
  )
}

export const Default = Template.bind({}) as any
Default.args = {
}

export const SingleLetter = Template.bind({}) as any
SingleLetter.args = {
  name: 'Alexander',
}

export const FullName = Template.bind({}) as any
FullName.args = {
  name: 'David Hérault',
}

export const LongName = Template.bind({}) as any
LongName.args = {
  name: 'Edgard Alan Poe',
}

export const SrcAndName = Template.bind({}) as any
SrcAndName.args = {
  name: 'David Hérault',
  src: 'https://avatars.githubusercontent.com/u/4154003?v=4',
}

export const Src = Template.bind({}) as any
Src.args = {
  src: 'https://avatars.githubusercontent.com/u/4154003?v=4',
}

export const WonkySrc = Template.bind({}) as any
WonkySrc.args = {
  src: 'https://wonky.src.image.tld',
}

export const Size = Template.bind({}) as any
Size.args = {
  name: 'Julien Brothero',
  size: 64,
}
