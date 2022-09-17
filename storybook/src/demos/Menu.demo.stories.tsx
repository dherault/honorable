// Icons from https://icons.modulz.app/
import React from 'react'
import { Menu, MenuItem } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Menu',
  component: Menu,
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

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-menu--basic&viewMode=story
// START-SOURCE
function MenuBasic() {
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
    <Menu>
      {items.map(renderItem)}
    </Menu>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = MenuBasic.bind({})

// START-DEMO
// @name SubMenu
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-menu--sub-menu&viewMode=story
// START-SOURCE
function MenuSubMenu() {
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
    <Menu>
      {makeItems(items, 6).map(renderItem)}
    </Menu>
  )
}
// END-SOURCE
// END-DEMO

export const SubMenu = MenuSubMenu.bind({})

// START-DEMO
// @name Fade
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-menu--fade&viewMode=story
// START-SOURCE
function MenuFade() {
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
    <Menu fade>
      {makeItems(items, 6).map(renderItem)}
    </Menu>
  )
}
// END-SOURCE
// END-DEMO

export const Fade = MenuFade.bind({})

// START-DEMO
// @name Closed
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-menu--closed&viewMode=story
// START-SOURCE
function MenuClosed() {
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
    <Menu open={false}>
      {items.map(renderItem)}
    </Menu>
  )
}
// END-SOURCE
// END-DEMO

export const Closed = MenuClosed.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-menu--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <Menu {...args} />
  ),
  'Menu',
  ['children']
).bind({})
Parts.args = {
  children:
      items.map(({ text, value }: any) => (
        <MenuItem value={value}>
          {text}
        </MenuItem>
      ))
  ,
}
