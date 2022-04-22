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
  function renderItem({ text, items }) {
    return (
      <MenuItem
        key={text}
        value={text}
      >
        {text}
        {Array.isArray(items) && (
          <Menu>
            {items.map(renderItem)}
          </Menu>
        )}
      </MenuItem>
    )
  }

  return (
    <Menu {...args}>
      {items.map(renderItem)}
    </Menu>
  )
}

const items = [
  { text: 'For' },
  { text: 'CSS' },
  { text: 'Lovers' },
  { text: 'And' },
]

function makeItems(items, depth = 1) {
  if (depth <= 0) return items

  return items.map((item, i) => ({
    ...item,
    items: i % 2 === depth % 2 ? null : makeItems(items, depth - 1),
  }))
}

export const Default = Template.bind({})
Default.args = {
  items,
}

export const SubMenu = Template.bind({})
SubMenu.args = {
  items: makeItems(items, 6),
}
