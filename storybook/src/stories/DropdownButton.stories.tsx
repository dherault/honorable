import React, { useState } from 'react'

import { A, DropdownButton, ExtendTheme, Flex, Menu, MenuItem } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'DropdownButton',
  component: DropdownButton,
}

const items = [
  { text: 'For', value: 'For' },
  { text: 'CSS', value: 'CSS' },
  { text: 'Lovers', value: 'Lovers' },
  { text: 'And', value: 'And' },
]

function renderItem({ text, items }: any) {
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

function Template({ items, ...args }: any) {
  return (
    <DropdownButton {...args}>
      {items.map(renderItem)}
    </DropdownButton>
  )
}

function Template2({ items, ...args }: any) {
  const [open, setOpen] = useState(false)

  return (
    <Flex align="center">
      <DropdownButton
        open={open}
        {...args}
      >
        {items.map(renderItem)}
      </DropdownButton>
      <A
        ml={1}
        userSelect="none"
        onClick={() => setOpen(x => !x)}
      >
        Toggle
      </A>
    </Flex>
  )
}

const extendedTheme = {
  DropdownButton: {
    Menu: [
      {
        width: 256,
        left: 'unset',
      },
    ],
  },
}

function Template3({ items, ...args }: any) {
  return (
    <ExtendTheme theme={extendedTheme}>
      <DropdownButton {...args}>
        {items.map(renderItem)}
      </DropdownButton>
    </ExtendTheme>
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

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Drop it!',
  items,
  disabled: true,
}

export const Extended = Template3.bind({})
Extended.args = {
  label: 'Drop it!',
  items,
}

export const Fade = Template.bind({})
Fade.args = {
  fade: true,
  label: 'Drop it!',
  items,
}

export const EndIcon = Template.bind({})
EndIcon.args = {
  label: 'Drop it!',
  items,
  endIcon: (
    <svg
      width={10}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00001 12L2.80386 6H13.1962L8.00001 12Z"
        fill="currentColor"
      />
    </svg>
  ),
}
