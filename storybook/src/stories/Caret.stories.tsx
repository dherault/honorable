import React from 'react'
import { Caret } from 'honorable'

export default {
  title: 'Components/Caret',
  component: Caret,
}

function Template(args: any) {
  return (
    <Caret {...args} />
  )
}

export const Default = Template.bind({}) as any
Default.args = {
}

export const Rotation = Template.bind({}) as any
Rotation.args = {
  rotation: -90,
}
