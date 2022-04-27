import { useState } from 'react'

import { Switch } from 'honorable'

export default {
  title: 'Switch',
  component: Switch,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

function Template(args) {
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
