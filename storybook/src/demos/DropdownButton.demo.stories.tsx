// Icons from https://icons.modulz.app/
import React, { useState } from 'react'
import { A, Div, DropdownButton, ExtendTheme, Flex, Menu, MenuItem } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/DropdownButton',
  component: DropdownButton,
}

const items = [
  { text: 'For', value: 'For' },
  { text: 'CSS', value: 'CSS' },
  { text: 'Lovers', value: 'Lovers' },
  { text: 'And', value: 'And' },
]

function renderItem({ text, items }: any, depth = 0) {
  return (
    <MenuItem
      key={text + depth}
      value={text + depth}
    >
      {text}
      {Array.isArray(items) && (
        <Menu>
          {items.map(x => renderItem(x, depth + 1))}
        </Menu>
      )}
    </MenuItem>
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

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-dropdownbutton--basic&viewMode=story
// START-SOURCE
function DropdownButtonBasicDemo() {
  return (
    <Div>
      <DropdownButton 
        label="Drop it!"
      >
        {items.map(renderItem)}
      </DropdownButton>
      <Div mt={1}>
        Am I underneath?
      </Div>
      <DropdownButton 
        label="Drop it!"
        disabled
        mt={1}
      >
        {items.map(renderItem)}
      </DropdownButton>
    </Div>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = DropdownButtonBasicDemo.bind({})

// START-DEMO
// @name DefaultOpen
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-dropdownbutton--defaultopen&viewMode=story
// START-SOURCE
function DropdownButtonDefaultOpenDemo() {
  return (
    <Div>
      <DropdownButton 
        label="Drop it!"
        defaultOpen
      >
        {items.map(renderItem)}
      </DropdownButton>
      <Div mt={1}>
        Am I underneath?
      </Div>
    </Div>
  )
}
// END-SOURCE
// END-DEMO

export const DefaultOpen = DropdownButtonDefaultOpenDemo.bind({})

// START-DEMO
// @name SubMenu
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-dropdownbutton--submenu&viewMode=story
// START-SOURCE
function DropdownButtonSubMenuDemo() {
  return (
    <Div>
      <DropdownButton 
        label="Drop it!"
      >
        {makeItems(items, 6).map(renderItem)}
      </DropdownButton>
      <Div mt={1}>
        Am I underneath?
      </Div>
    </Div>
  )
}
// END-SOURCE
// END-DEMO

export const SubMenu = DropdownButtonSubMenuDemo.bind({})

// START-DEMO
// @name Controlled
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-dropdownbutton--controlled&viewMode=story
// START-SOURCE
function DropdownButtonControlledDemo() {
  const [open, setOpen] = useState(false)

  return (
    <Flex align="center">
      <DropdownButton
        open={open}
        label="Drop it!"
        onOpen={prev => setOpen(prev)}
      >
        {items.map(renderItem)}
      </DropdownButton>
      <A
        ml={1}
        userSelect="none"
        onClick={() => setOpen(prev => !prev)}
      >
        Toggle 
      </A>
    </Flex>
  )
}
// END-SOURCE
// END-DEMO

export const Controlled = DropdownButtonControlledDemo.bind({})

// START-DEMO
// @name Extended
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-dropdownbutton--extended&viewMode=story
// START-SOURCE
function DropdownButtonExtendedDemo() {
  return (
    <ExtendTheme theme={{
      DropdownButton: {
        Menu: [
          {
            width: 256,
            left: 'unset',
          },
        ],
      },
    }}
    >
      <DropdownButton
        label="Drop it!"
      >
        {items.map(renderItem)}
      </DropdownButton>
    </ExtendTheme>
  )
}
// END-SOURCE
// END-DEMO

export const Extended = DropdownButtonExtendedDemo.bind({})

// START-DEMO
// @name Fade
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-dropdownbutton--fade&viewMode=story
// START-SOURCE
function DropdownButtonFadeDemo() {
  return (
    <Div>
      <DropdownButton 
        label="Drop it!"
        fade
      >
        {items.map(renderItem)}
      </DropdownButton>
      <Div mt={1}>
        Am I underneath?
      </Div>
    </Div>
  )
}
// END-SOURCE
// END-DEMO

export const Fade = DropdownButtonFadeDemo.bind({})

// START-DEMO
// @name EndIcon
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-dropdownbutton--endicon&viewMode=story
// START-SOURCE
function DropdownButtonEndIconDemo() {
  return (
    <Div>
      <DropdownButton
        label="Drop it!"
        endIcon={(
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
        )}
      >
        {items.map(renderItem)}
      </DropdownButton>
      <Div mt={1}>
        Am I underneath?
      </Div>
    </Div>
  )
}
// END-SOURCE
// END-DEMO

export const EndIcon = DropdownButtonEndIconDemo.bind({})

// START-DEMO
// @name EventOrder
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-dropdownbutton--eventorder&viewMode=story
// START-SOURCE
function DropdownButtonEventOrderDemo() {
  return (
    <Div>
      <DropdownButton
        label="Drop it!"
        onChange={() => console.log(1)}
        onOpen={prev => console.log(2, prev)}
      >
        {items.map(renderItem)}
      </DropdownButton>
      <Div mt={1}>
        Am I underneath?
      </Div>
    </Div>
  )
}
// END-SOURCE
// END-DEMO

export const EventOrder = DropdownButtonEventOrderDemo.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-dropdownbutton--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <DropdownButton 
      {...args}
    />
  ),
  'DropdownButton',
  ['label', 'Children', 'endIcon']
).bind({})
Parts.args = {
  label: 'Drop it!',
  defaultOpen: true,
  children: items.map(renderItem),
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
