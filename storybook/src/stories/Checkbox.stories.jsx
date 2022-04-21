import React, { useState } from 'react'

import { Checkbox } from 'honorable'

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

function Template(args) {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      onChange={event => setChecked(event.target.checked)}
      {...args}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  disabled: false,
}
