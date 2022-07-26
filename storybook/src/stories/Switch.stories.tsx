import React, { useState } from 'react'

import { Switch } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Components/Switch',
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
  disabled: false,
}

export const Label = Template.bind({})
Label.args = {
  disabled: false,
  children: 'A switch',
}

export const LabelPositionLeft = Template.bind({})
LabelPositionLeft.args = {
  disabled: false,
  children: 'A switch',
  labelPosition: 'left',
}

export const LabelPositionTop = Template.bind({})
LabelPositionTop.args = {
  disabled: false,
  children: 'A switch',
  labelPosition: 'top',
}

export const LabelPositionBottom = Template.bind({})
LabelPositionBottom.args = {
  disabled: false,
  children: 'A switch',
  labelPosition: 'bottom',
}
