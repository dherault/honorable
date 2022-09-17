// Icons from https://icons.modulz.app/
import React, { useState } from 'react'
import { A, Flex, Menu, MenuItem, Select } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Select',
  component: Select,
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

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-select--basic&viewMode=story
// START-SOURCE
function SelectBasic() {
  const [value, setValue] = useState('Lovers')

  return (
    <Select
      value={value}
      onChange={event => setValue(event.target.value)}
    >
      {items.map(renderItem)}
    </Select>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = SelectBasic.bind({})

// START-DEMO
// @name DefaultOpen
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-select--default-open&viewMode=story
// START-SOURCE
function SelectDefaultOpen() {
  const [value, setValue] = useState()

  return (
    <Select
      value={value}
      defaultOpen
      onChange={event => setValue(event.target.value)}
    >
      {items.map(renderItem)}
    </Select>
  )
}
// END-SOURCE
// END-DEMO

export const DefaultOpen = SelectDefaultOpen.bind({})

// START-DEMO
// @name SubMenu
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-select--sub-menu&viewMode=story
// START-SOURCE
function SelectSubMenu() {
  const [value, setValue] = useState()

  return (
    <Select
      value={value}
      defaultOpen
      onChange={event => setValue(event.target.value)}
    >
      {makeItems(items, 6).map(renderItem)}
    </Select>
  )
}
// END-SOURCE
// END-DEMO

export const SubMenu = SelectSubMenu.bind({})

// START-DEMO
// @name Controlled
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-select--controlled&viewMode=story
// START-SOURCE
function SelectControlled() {
  const [value, setValue] = useState('')
  const allValues = findAllValues(items)

  return (
    <Flex>
      <Select
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
// END-SOURCE
// END-DEMO

export const Controlled = SelectControlled.bind({})

// START-DEMO
// @name LongItems
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-select--long-items&viewMode=story
// START-SOURCE
function SelectLongItems() {
  const [value, setValue] = useState('0')

  return (
    <Select
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
// END-SOURCE
// END-DEMO

export const LongItems = SelectLongItems.bind({})

// START-DEMO
// @name Icons
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-select--icons&viewMode=story
// START-SOURCE
function SelectIcons() {
  const [value, setValue] = useState('Lovers')

  return (
    <Select
      value={value}
      onChange={event => setValue(event.target.value)}
      startIcon={(
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
      )}
      endIcon={(
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
      )}
    >
      {items.map(renderItem)}
    </Select>
  )
}
// END-SOURCE
// END-DEMO

export const Icons = SelectIcons.bind({})

// START-DEMO
// @name RenderSelectedFn
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-select--render-selected-fn&viewMode=story
// START-SOURCE
function SelectRenderSelectedFn() {
  const [value, setValue] = useState('Lovers')

  return (
    <Select
      value={value}
      onChange={event => setValue(event.target.value)}
      renderSelected={(value: any) => <>{value} (custom)</>}
    >
      {items.map(renderItem)}
    </Select>
  )
}
// END-SOURCE
// END-DEMO

export const RenderSelectedFn = SelectRenderSelectedFn.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-select--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <Select
      {...args}
    />
  ),
  'Select',
  ['startIcon', 'endIcon']
).bind({})
Parts.args = {
  children: items.map(renderItem),
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
