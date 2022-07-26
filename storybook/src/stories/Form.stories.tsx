import React from 'react'

import { Input, MenuItem, Select } from 'honorable'

export default {
  title: 'Components/Form',
}

const items = [
  { text: 'For', value: 'For' },
  { text: 'CSS', value: 'CSS' },
  { text: 'Lovers', value: 'Lovers' },
  { text: 'And', value: 'And' },
]

function Template() {
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

export const Default = Template.bind({})
Default.args = {
}
