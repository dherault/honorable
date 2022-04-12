import { Button, Div, H1 } from 'honorable'

import ColorBox from '../components/ColorBox'

import ComponentVariator from '../components/ComponentVariator'

function Start() {
  return (
    <Div
      pt={4}
      pl={8}
    >
      <H1 mb={2.5}>Introduction to theming</H1>
      <ColorBox color="primary" />
      <Div mt={2}>
        <ComponentVariator
          Component={Button}
          additionalVariations={{ disabled: { disabled: true } }}
        >
          A cool button
        </ComponentVariator>
      </Div>
    </Div>
  )
}

export default Start
