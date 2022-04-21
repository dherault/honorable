import React, { useState } from 'react'

import { MenuItem, Select } from 'honorable'

export default {
  title: 'Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

function Template(args) {
  const [value, setValue] = useState(null)

  return (
    <Select
      value={value}
      onChange={event => setValue(event.target.value)}
      {...args}
    >
      <MenuItem value={0}>JavaScript</MenuItem>
      <MenuItem value={1}>HTML</MenuItem>
      <MenuItem value={2}>CSS</MenuItem>
    </Select>
  )
}

export const Default = Template.bind({})
Default.args = {
}
