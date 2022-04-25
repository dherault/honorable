// Icons from https://icons.modulz.app/
import React from 'react'

import { Div } from 'honorable'

export default {
  title: 'Div',
  component: Div,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

function Template(args) {
  return (
    <Div
      w={256}
      direction="row"
      backgroundColor="primary"
      focusIndicator="red"
    >
      <div>Foo</div><div>bar</div>
    </Div>
  )
}

export const Default = Template.bind({})
Default.args = {
}
