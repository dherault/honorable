import { useState } from 'react'

import { A, Div, RadioButton } from 'honorable'

export default {
  title: 'RadioButton',
  component: RadioButton,
}

function Template(args) {
  return (
    <Div xflex="y1">
      <RadioButton
        {...args}
      />
    </Div>
  )
}

function Template2(args) {
  const [checked, setChecked] = useState(false)

  return (
    <Div xflex="x4">
      <RadioButton
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

    </Div>
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
  children: 'A RadioButton',
}

export const Label = Template.bind({})
Label.args = {
  disabled: false,
  children: 'A RadioButton',
}

export const LabelPositionLeft = Template.bind({})
LabelPositionLeft.args = {
  disabled: false,
  children: 'A RadioButton',
  labelPosition: 'left',
}

export const LabelPositionTop = Template.bind({})
LabelPositionTop.args = {
  disabled: false,
  children: 'A RadioButton',
  labelPosition: 'top',
}

export const LabelPositionBottom = Template.bind({})
LabelPositionBottom.args = {
  disabled: false,
  children: 'A RadioButton',
  labelPosition: 'bottom',
}
