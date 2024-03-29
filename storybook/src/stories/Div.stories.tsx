import React from 'react'

import { Div } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Components/Div',
  component: Div,
}

function Template(args: any) {
  return (
    <Div {...args} />
  )
}

export const Default = Template.bind({}) as any
Default.args = {
  title: 'An Div',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  color: 'white',
  backgroundColor: 'tomato',
  padding: 16,
}
