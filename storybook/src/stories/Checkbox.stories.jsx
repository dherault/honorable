import { useState } from 'react'

import { A, Checkbox, Div } from 'honorable'

export default {
  title: 'Checkbox',
  component: Checkbox,
}

function Template(args) {
  return (
    <Div xflex="y1">
      <Checkbox
        {...args}
      />
    </Div>
  )
}

function Template2(args) {
  const [checked, setChecked] = useState(false)

  return (
    <Div xflex="x4">
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
