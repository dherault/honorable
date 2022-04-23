import React, { useState } from 'react'

import { Menu, MenuItem, Select } from 'honorable'

export default {
  title: 'Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

function Template({ items, initialValue, ...args }) {
  const [value, setValue] = useState(initialValue)

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
    <Select
      {...args}
      value={value}
      onChange={event => setValue(event.target.value)}
    >
      {items.map(renderItem)}
    </Select>
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

export const Selected = Template.bind({})
Selected.args = {
  items,
  initialValue: 'Lovers',
}

export const SubMenu = Template.bind({})
SubMenu.args = {
  items: makeItems(items, 6),
}
