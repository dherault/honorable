import React, { useState } from 'react'

import { A, Button, Div, Flex, Menu, MenuItem, Select } from 'honorable'

export default {
  title: 'Components/Select',
  component: Div,
}

const items = [
  { text: 'For', value: 'For' },
  { text: 'CSS', value: 'CSS' },
  { text: 'Lovers', value: 'Lovers' },
  { text: 'And', value: 'And' },
]

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

function renderItem({ text, value, items }: any, index: number) {
  return (
    <MenuItem
      key={text + index}
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

function Template4(args: any) {
  const [value, setValue] = useState('0')

  return (
    <Select
      {...args}
      value={value}
      onChange={event => setValue(event.target.value)}
    >
      <MenuItem value="0">
        A long long long long train running in a deep dark forest.
      </MenuItem>
      <MenuItem value="1">
        A long long long long train running in a deep dark forest.
      </MenuItem>
      <MenuItem value="2">
        A long long long long train running in a deep dark forest.
      </MenuItem>
    </Select>
  )
}

const zeros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function TemplateChanging() {
  const [value, setValue] = useState(null)
  const [count, setCount] = useState(0)

  return (
    <>
      <Button onClick={() => setCount(x => x + 1)}>
        Increment
      </Button>
      <Select
        value={value}
        onChange={event => setValue(event.target.value)}
        mt={2}
      >
        {zeros.map((_x, i) => (
          <MenuItem key={i}><div>{count + i}</div></MenuItem>
        ))}
      </Select>
    </>
  )
}

export const Default = Template.bind({}) as any
Default.args = {
  items,
}

export const LotsOfItems = Template.bind({}) as any
LotsOfItems.args = {
  items: [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items],
}

export const Placeholder = Template.bind({}) as any
Placeholder.args = {
  items,
  placeholder: 'Select an item',
  initialValue: null,
}

export const MenuOnTop = Template.bind({}) as any
MenuOnTop.args = {
  items,
  menuOnTop: true,
}

export const DefaultOpen = Template.bind({}) as any
DefaultOpen.args = {
  items,
  defaultOpen: true,
}

export const InitialValue = Template.bind({}) as any
InitialValue.args = {
  items,
  initialValue: 'Lovers',
}

export const SubMenu = Template.bind({}) as any
SubMenu.args = {
  items: makeItems(items, 6),
}

export const Controlled = Template2.bind({}) as any
Controlled.args = {
  items,
}

export const ControlledChanging = Template3.bind({}) as any
ControlledChanging.args = {
  items,
}

export const ControlledChangingSubMenu = Template3.bind({}) as any
ControlledChangingSubMenu.args = {
  items: makeItems(items, 6),
}

export const LongItems = Template4.bind({}) as any
LongItems.args = {
}

export const StartIcon = Template.bind({}) as any
StartIcon.args = {
  items,
  startIcon: (
    <svg
      width={16}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.1465 1.48959C7.34176 1.29432 7.65835 1.29432 7.85361 1.48959L13.5105 7.14644C13.7057 7.3417 13.7057 7.65829 13.5105 7.85355L7.85361 13.5104C7.65835 13.7057 7.34176 13.7057 7.1465 13.5104L1.48965 7.85355C1.29439 7.65829 1.29439 7.3417 1.48965 7.14644L7.1465 1.48959ZM7.50005 2.55025L2.55031 7.49999L7.50005 12.4497L12.4498 7.49999L7.50005 2.55025Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
}

export const EndIcon = Template.bind({}) as any
EndIcon.args = {
  items,
  endIcon: (
    <svg
      width={16}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.1465 1.48959C7.34176 1.29432 7.65835 1.29432 7.85361 1.48959L13.5105 7.14644C13.7057 7.3417 13.7057 7.65829 13.5105 7.85355L7.85361 13.5104C7.65835 13.7057 7.34176 13.7057 7.1465 13.5104L1.48965 7.85355C1.29439 7.65829 1.29439 7.3417 1.48965 7.14644L7.1465 1.48959ZM7.50005 2.55025L2.55031 7.49999L7.50005 12.4497L12.4498 7.49999L7.50005 2.55025Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
}

export const EndIconFalse = Template.bind({}) as any
EndIconFalse.args = {
  items,
  endIcon: false,
}

export const RenderSelectedFn = Template.bind({}) as any
RenderSelectedFn.args = {
  items,
  renderSelected: (value: any) => `${value} (custom)`,
}

export const MenuItemComplexChildren = Template.bind({}) as any
MenuItemComplexChildren.args = {
  items: [
    {
      value: 0,
      text: <div>0</div>,
    },
    {
      value: 1,
      text: <div><div>1</div></div>,
    },
    {
      value: 2,
      text: <div><div><div>2</div></div></div>,
    },
  ],
}

export const MenuItemComplexChildrenChanging = TemplateChanging.bind({}) as any
MenuItemComplexChildrenChanging.args = {
  items: [
    {
      value: 0,
      text: <div>0</div>,
    },
    {
      value: 1,
      text: <div><div>1</div></div>,
    },
    {
      value: 2,
      text: <div><div><div>2</div></div></div>,
    },
  ],
}
