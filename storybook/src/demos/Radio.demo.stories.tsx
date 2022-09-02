// Icons from https://icons.modulz.app/
import React, { useState } from 'react'
import { A, Div, Flex, P, Radio } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Radio',
  component: Radio,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-radio--basic&viewMode=story
// START-SOURCE
function RadioBasic() {
  return (
    <Flex>
      <Radio />
      <Radio
        ml={2}
        disabled
      />
    </Flex>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = RadioBasic.bind({})

// START-DEMO
// @name Controlled
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-radio--controlled&viewMode=story
// START-SOURCE
function RadioControlled() {
  const [checked, setChecked] = useState(false)

  return (
    <Flex>
      <Radio
        checked={checked}
        onChange={event => setChecked(event.target.checked)}
      />
      <A
        ml={1}
        userSelect="none"
        onClick={() => setChecked(x => !x)}
      >
        Toggle
      </A>
    </Flex>
  )
}
// END-SOURCE
// END-DEMO

export const Controlled = RadioControlled.bind({})

// START-DEMO
// @name Label
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-radio--label&viewMode=story
// START-SOURCE
function RadioLabel() {
  return (
    <Div>
      <Radio>A Radio</Radio>
      <Radio
        mt={1}
        labelPosition="top"
      >A Radio
      </Radio>
      <Radio
        mt={1}
        labelPosition="left"
      >A Radio
      </Radio>
      <Radio
        mt={1}
        labelPosition="bottom"
      >A Radio
      </Radio>
      <Radio mt={1}>
        <P fontSize="0.5rem">
          A small Radio
        </P>
      </Radio>
    </Div>
  )
}
// END-SOURCE
// END-DEMO

export const Label = RadioLabel.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-radio--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <Radio
      {...args}
    />
  ),
  'Radio',
  ['Children']
).bind({})
Parts.args = {
  children: 'A Radio', 
}
