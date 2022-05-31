import React from 'react'
import { Box } from 'honorable'

export default {
  title: 'Box',
  component: Box,
}

function Template(args: any) {
  return (
    <Box {...args} />
  )
}

export const Default = Template.bind({})
Default.args = {
  width: 64,
  height: 64,
  backgroundColor: 'primary',
}
