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
      <Checkbox
        mt={0.5}
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
