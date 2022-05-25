import React from 'react'
import { A, Div, P } from 'honorable'

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

function Template2() {
  return (
    <>
      <Div
        as="a"
        href="#"
      >
        I should be a `a` element although I'm a `Div`.
      </Div>
      <Div
        as={A}
        href="#"
      >
        I should be a `A` element although I'm a `Div`.
      </Div>
    </>
  )
}

export const AsAnchor = Template2.bind({})
AsAnchor.args = {
}
