import React, { Spinner } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Spinner',
  component: Spinner,
}

function Template(args: any) {
  return (
    <Spinner {...args} />
  )
}

export const Default = Template.bind({})
Default.args = {
}

export const Large = Template.bind({})
Large.args = {
  size: 64,
}
