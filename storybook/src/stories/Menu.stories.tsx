import { useState } from 'react'
import React, { A, Menu, MenuItem } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Components/Menu',
  component: Menu,
}

const items = [
  { text: 'For', value: 'For' },
  { text: 'CSS', value: 'CSS' },
  { text: 'Lovers', value: 'Lovers' },
  { text: 'And', value: 'And' },
]

function Template({ items, ...args }: any) {
  function renderItem({ text, value, items }: any) {
    return (
      <MenuItem
        key={text}
        value={value}
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

function Template2({ items, ...args }: any) {
  const [open, setOpen] = useState(false)

  function renderItem({ text, value, items }: any) {
    return (
      <MenuItem
        key={text}
        value={value}
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
    <>
      <A onClick={() => setOpen(x => !x)}>{open ? 'Close' : 'Open'}</A>
      <Menu
        mt={1}
        open={open}
        {...args}
      >
        {items.map(renderItem)}
      </Menu>
    </>
  )
}

function makeItems(items: any[], depth = 1): any[] {
  if (depth <= 0) return items

  return items.map((item, i) => ({
    ...item,
    value: item.text + depth,
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

export const Fade = Template.bind({})
Fade.args = {
  fade: true,
  items: makeItems(items, 6),
}

export const Closed = Template.bind({})
Closed.args = {
  items,
  open: false,
}

export const ClosedFade = Template2.bind({})
ClosedFade.args = {
  items,
  fade: true,
}
