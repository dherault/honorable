import React, { useState } from 'react'

import { Div, Switch } from 'honorable'

export default {
  title: 'Switch',
  component: Switch,
}

function Template(args: any) {
  const [checked, setChecked] = useState(null)

  return (
    <Div xflex="y2">
      <Switch
        checked={checked}
        // @ts-ignore
        onChange={event => setChecked(event.target.checked)}
        {...args}
      />
    </Div>
  )
}

export const Default = Template.bind({})
Default.args = {
}
