import React from 'react'

import { Menu, MenuItem } from 'honorable'

export default {
  title: 'Menu',
  component: Menu,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

function Template(args) {
  return (
    <Menu {...args}>
      <MenuItem>JavaScript</MenuItem>
      <MenuItem>HTML</MenuItem>
      <MenuItem>CSS</MenuItem>
    </Menu>
  )
}

export const Default = Template.bind({})
Default.args = {
}
