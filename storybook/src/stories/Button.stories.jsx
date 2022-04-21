import React from 'react'

import { Button } from 'honorable'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

function Template(args) {
  return <Button {...args} />
}

export const Default = Template.bind({})
Default.args = {
  children: 'Button',
  disabled: false,
}
