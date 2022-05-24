import React, { useState } from 'react'

import { A, Flex, Menu, MenuItem, Select } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Select',
  component: Select,
}

const items = [
  { text: 'For', value: 'For' },
  { text: 'CSS', value: 'CSS' },
  { text: 'Lovers', value: 'Lovers' },
  { text: 'And', value: 'And' },
]

function renderItem({ text, value, items }: any) {
  return (
    <MenuItem
      key={text}
      value={value}
    >
      {text}
      {Array.isArray(items) && items.length > 0 && (
        <Menu>
          {items.map(renderItem)}
        </Menu>
      )}
    </MenuItem>
  )
}

function Template({ items, initialValue, ...args }: any) {
  const [value, setValue] = useState(initialValue)

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

function Template2({ items, initialValue, ...args }: any) {
  const [value, setValue] = useState(initialValue)
  const [open, setOpen] = useState(false)

  return (
    <Flex>
      <Select
        {...args}
        open={open}
        onOpen={setOpen}
        value={value}
        onChange={event => setValue(event.target.value)}
      >
        {items.map(renderItem)}
      </Select>
      <A
        ml={1}
        onClick={() => setOpen(x => !x)}
        userSelect="none"
      >
        Toggle
      </A>
    </Flex>
  )
}

function Template3({ items, initialValue, ...args }: any) {
  const [value, setValue] = useState(initialValue)
  const allValues = findAllValues(items)

  return (
    <Flex>
      <Select
        {...args}
        value={value}
        onChange={event => setValue(event.target.value)}
      >
        {items.map(renderItem)}
      </Select>
      <A
        ml={1}
        userSelect="none"
        onClick={() => {
          setValue((x: any) => {
            const index = allValues.indexOf(x)

            return allValues[index === -1 ? 0 : (index + 1) % allValues.length]
          })
        }}
      >
        Change value
      </A>
      <A
        ml={1}
        userSelect="none"
        onClick={() => setValue('nonsense')}
      >
        Change to invalid value
      </A>
    </Flex>
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

function findAllValues(items: any[]) {
  return items.reduce((acc, item) => {
    acc.push(item.value)

    if (Array.isArray(item.items)) {
      acc.push(...findAllValues(item.items))
    }

    return acc
  }, [])
}

export const Default = Template.bind({})
Default.args = {
  items,
}

export const DefaultOpen = Template.bind({})
DefaultOpen.args = {
  items,
  defaultOpen: true,
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

export const Controlled = Template2.bind({})
Controlled.args = {
  items,
}

export const ControlledChanging = Template3.bind({})
ControlledChanging.args = {
  items,
}

export const ControlledChangingSubMenu = Template3.bind({})
ControlledChangingSubMenu.args = {
  items: makeItems(items, 6),
}
