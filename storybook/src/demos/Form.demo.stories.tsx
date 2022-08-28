// Icons from https://icons.modulz.app/
import React from 'react'
import { Form, Input, MenuItem, Select } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Form',
  component: Form,
}

const items = [
  { text: 'For', value: 'For' },
  { text: 'CSS', value: 'CSS' },
  { text: 'Lovers', value: 'Lovers' },
  { text: 'And', value: 'And' },
]

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-form--basic&viewMode=story
// START-SOURCE
function FormBasic() {
  return (
    <>
      <Select>
        {items.map(item => (
          <MenuItem
            key={item.text}
            value={item.value}
          >
            {item.text}
          </MenuItem>
        ))}
      </Select>
      <Input mt={1} />
    </>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = FormBasic.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-form--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <Select {...args}>
      {args.items.map((item: any) => (
        <MenuItem
          key={item.text}
          value={item.value}
        >
          {item.text}
        </MenuItem>
      ))}
    </Select>
  ),
  'Select',
  []
).bind({})
Parts.args = {
  items,
}
