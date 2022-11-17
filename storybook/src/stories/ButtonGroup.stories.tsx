import React from 'react'
import { Button, ButtonGroup } from 'honorable'

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
}

function Template(args: any) {
  return (
    <ButtonGroup {...args}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </ButtonGroup>
  )
}

export const Default = Template.bind({}) as any
Default.args = {
}

export const Column = Template.bind({}) as any
Column.args = {
  direction: 'column',
}
