import React from 'react'
import { DropdownButton, ExtendTheme } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Theming',
}

const extendedTheme1 = {
  DropdownButton: {
    Button: {
      Children: [
        ({ install }: any) => install && {
          color: 'red',
        },
      ],
    },
  },
}

function Template1() {
  return (
    <ExtendTheme theme={extendedTheme1}>
      <DropdownButton
        install
        label="Install"
      />
    </ExtendTheme>
  )
}

export const Theming1 = Template1.bind({})
Theming1.args = {
}
