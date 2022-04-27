import { useState } from 'react'

import { Button, Div, DropdownButton, Menu, MenuItem } from 'honorable'

export default {
  title: 'DropdownButton',
  component: DropdownButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

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

function Template({ items, ...args }) {
  return (
    <DropdownButton {...args}>
      {items.map(renderItem)}
    </DropdownButton>
  )
}

function Template2({ items, ...args }) {
  const [open, setOpen] = useState(false)

  return (
    <Div xflex="x4">
      <DropdownButton
        open={open}
        {...args}
      >
        {items.map(renderItem)}
      </DropdownButton>
      <Button
        ml={1}
        onClick={() => setOpen(x => !x)}
      >
        Toggle
      </Button>
    </Div>
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
  label: 'Drop it!',
  items,
}

export const DefaultOpen = Template.bind({})
DefaultOpen.args = {
  label: 'Drop it!',
  items,
  defaultOpen: true,
}

export const SubMenu = Template.bind({})
SubMenu.args = {
  label: 'Drop it!',
  items: makeItems(items, 6),
}

export const Controlled = Template2.bind({})
Controlled.args = {
  label: 'Drop it!',
  items,
}
