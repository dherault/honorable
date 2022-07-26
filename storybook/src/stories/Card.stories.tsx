// Icons from https://icons.modulz.app/
import React from 'react'
import { Card } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Components/Card',
  component: Card,
}

function Template(args: any) {
  return (
    <Card {...args} />
  )
}

export const Default = Template.bind({})
Default.args = {
  width: 256,
  height: 256,
}
