import React, { useState } from 'react'

import { Switch } from 'honorable'

export default {
  title: 'Switch',
  component: Switch,
}

function Template(args: any) {
  const [checked, setChecked] = useState(null)

  return (
    <Switch
      checked={checked}
      onChange={event => setChecked(event.target.checked)}
      {...args}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
}
