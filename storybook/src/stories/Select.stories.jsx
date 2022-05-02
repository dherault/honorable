import { useState } from 'react'

import { A, Div, Menu, MenuItem, Select } from 'honorable'

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

function renderItem({ text, value, items }) {
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

function Template({ items, initialValue, ...args }) {
  const [value, setValue] = useState(initialValue)

  return (
    <Div xflex="y2">
      <Select
        {...args}
        value={value}
        onChange={event => setValue(event.target.value)}
      >
        {items.map(renderItem)}
      </Select>
    </Div>
  )
}

function Template2({ items, initialValue, ...args }) {
  const [value, setValue] = useState(initialValue)
  const [open, setOpen] = useState(false)

  return (
    <Div xflex="y2">
      <Div xflex="x4">
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
      </Div>
    </Div>
  )
}

function Template3({ items, initialValue, ...args }) {
  const [value, setValue] = useState(initialValue)
  const allValues = findAllValues(items)

  return (
    <Div xflex="y2">
      <Div xflex="x4">
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
            setValue(x => {
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
      </Div>
    </Div>
  )
}

function makeItems(items, depth = 1) {
  if (depth <= 0) return items

  return items.map((item, i) => ({
    ...item,
    value: item.text + depth,
    items: i % 2 === depth % 2 ? null : makeItems(items, depth - 1),
  }))
}

function findAllValues(items) {
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
