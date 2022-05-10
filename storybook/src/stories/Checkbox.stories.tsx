import React, { useState } from 'react'

import { A, Checkbox, Flex } from 'honorable'

export default {
  title: 'Checkbox',
  component: Checkbox,
}

function Template(args: any) {
  return (
    <Checkbox
      {...args}
    />
  )
}

function Template2(args: any) {
  const [checked, setChecked] = useState(false)

  return (
    <Flex>
      <Checkbox
        checked={checked}
        onChange={event => setChecked(event.target.checked)}
        {...args}
      />
      <A
        ml={1}
        userSelect="none"
        onClick={() => setChecked(x => !x)}
      >
        Toggle
      </A>
    </Flex>
  )
}

export const Default = Template.bind({})
Default.args = {
  disabled: false,
}

export const Controlled = Template2.bind({})
Controlled.args = {
  disabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: 'A checkbox',
}

export const Label = Template.bind({})
Label.args = {
  disabled: false,
  children: 'A checkbox',
}

export const LabelPositionLeft = Template.bind({})
LabelPositionLeft.args = {
  disabled: false,
  children: 'A checkbox',
  labelPosition: 'left',
}

export const LabelPositionTop = Template.bind({})
LabelPositionTop.args = {
  disabled: false,
  children: 'A checkbox',
  labelPosition: 'top',
}

export const LabelPositionBottom = Template.bind({})
LabelPositionBottom.args = {
  disabled: false,
  children: 'A checkbox',
  labelPosition: 'bottom',
}
