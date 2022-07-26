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

export const Default = Template.bind({})
Default.args = {
}

export const Rotation = Template.bind({})
Rotation.args = {
  rotation: -90,
}
