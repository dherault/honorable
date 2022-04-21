import React from 'react'

import { Menu, MenuItem } from 'honorable'

export default {
  title: 'Menu',
  component: Menu,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

function Template({ items, ...args }) {
  return (
    <Menu {...args}>
      {items.map(item => (
        <MenuItem
          key={item}
          value={item}
        >
          {item}
        </MenuItem>
      ))}
    </Menu>
  )
}

export const Default = Template.bind({})
Default.args = {
  items: [
    'For',
    'CSS',
    'Lovers',
  ],
}
