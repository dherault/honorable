import React from 'react'
import { P } from 'honorable'

export default {
  title: 'Props Passing',
}

function Template1() {
  return (
    <P align="center">
      I have an `align="center"` prop, is it passed to the DOM?
    </P>
  )
}
export const AlignCenter = Template1.bind({})
AlignCenter.args = {
}
