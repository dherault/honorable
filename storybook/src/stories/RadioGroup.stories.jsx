import { useState } from 'react'

import { Div, Radio, RadioGroup } from 'honorable'

export default {
  title: 'RadioGroup',
  component: RadioGroup,
}

function Template(args) {
  return (
    <Div xflex="y1">
      <RadioGroup {...args}>
        <Radio value={0}>
          Zero
        </Radio>
        <Radio value={1}>
          One
        </Radio>
        <Radio value={2}>
          Two
        </Radio>
      </RadioGroup>
    </Div>
  )
}

function Template2(args) {
  const [value, setValue] = useState(null)

  return (
    <Div xflex="x4">
      <RadioGroup
        {...args}
        value={value}
        onChange={event => setValue(event.target.value)}
      >
        <Radio value={0}>
          Zero
        </Radio>
        <Radio value={1}>
          One
        </Radio>
        <Radio value={2}>
          Two
        </Radio>
      </RadioGroup>
    </Div>
  )
}

function Template3(args) {
  const [value, setValue] = useState(null)

  return (
    <Div xflex="x4">
      <RadioGroup
        {...args}
        value={value}
        onChange={event => setValue(event.target.value)}
      >
        <Radio value={0}>
          Zero
        </Radio>
        <Radio
          disabled
          value={1}
        >
          One
        </Radio>
        <Radio value={2}>
          Two
        </Radio>
      </RadioGroup>
    </Div>
  )
}

export const Default = Template.bind({})
Default.args = {
}

export const Controlled = Template2.bind({})
Controlled.args = {
}

export const Disabled = Template3.bind({})
Disabled.args = {
}

export const Row = Template3.bind({})
Row.args = {
  row: true,
}
