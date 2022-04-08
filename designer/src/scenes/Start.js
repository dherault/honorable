import { Button, Div, H1 } from 'honorable'

import ColorBox from '../components/ColorBox'

import ComponentVariator from '../components/ComponentVariator'

function Start() {
  return (
    <Div
      py={3}
      px={6}
    >
      <H1 mb={2.5}>Introduction to theming</H1>
      <ColorBox color="brand" />
      <Div mt={2}>
        <ComponentVariator Component={Button}>
          A cool button
        </ComponentVariator>
      </Div>
    </Div>
  )
}

export default Start
