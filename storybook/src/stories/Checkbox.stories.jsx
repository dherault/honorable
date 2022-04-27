import { useState } from 'react'

import { Checkbox, Div } from 'honorable'

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

function Template(args) {
  const [checked0, setChecked0] = useState(false)
  const [checked1, setChecked1] = useState(false)

  return (
    <Div xflex="y1">
      <Checkbox
        checked={checked0}
        onChange={event => setChecked0(event.target.checked)}
        {...args}
      />
      <Checkbox
        mt={0.5}
        checked={checked1}
        onChange={event => setChecked1(event.target.checked)}
        {...args}
      />
    </Div>
  )
}

export const Default = Template.bind({})
Default.args = {
  disabled: false,
}
