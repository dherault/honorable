// Icons from https://icons.modulz.app/
import React, { useState } from 'react'
import { Radio, RadioGroup } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/RadioGroup',
  component: RadioGroup,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-radiogroup--basic&viewMode=story
// START-SOURCE
function RadioGroupBasic() {
  return (
    <RadioGroup>
      <Radio value={0}>
        Zero
      </Radio>
      <Radio value={1}>
        One
      </Radio>
      <Radio value={2}>
        Two
      </Radio>
    </RadioGroup>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = RadioGroupBasic.bind({}) as any

// START-DEMO
// @name Controlled
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-radiogroup--controlled&viewMode=story
// START-SOURCE
function RadioGroupControlled() {
  const [value, setValue] = useState(null)

  return (
    <RadioGroup
      value={value}
      onChange={event => setValue(event.target.value)}
    >
      <Radio value={0}>
        Zero
      </Radio>
      <Radio value={1}>
        One
      </Radio>
      <Radio value={2}>
        Two
      </Radio>
    </RadioGroup>
  )
}
// END-SOURCE
// END-DEMO

export const Controlled = RadioGroupControlled.bind({}) as any

// START-DEMO
// @name Disabled
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-radiogroup--disabled&viewMode=story
// START-SOURCE
function RadioGroupDisabled() {
  const [value, setValue] = useState(null)

  return (
    <RadioGroup
      value={value}
      onChange={event => setValue(event.target.value)}
    >
      <Radio value={0}>
        Zero
      </Radio>
      <Radio
        disabled
        value={1}
      >
        One
      </Radio>
      <Radio value={2}>
        Two
      </Radio>
    </RadioGroup>
  )
}
// END-SOURCE
// END-DEMO

export const Disabled = RadioGroupDisabled.bind({}) as any

// START-DEMO
// @name Row
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-radiogroup--row&viewMode=story
// START-SOURCE
function RadioGroupRow() {
  const [value, setValue] = useState(null)

  return (
    <RadioGroup
      value={value}
      onChange={event => setValue(event.target.value)}
      row
    >
      <Radio value={0}>
        Zero
      </Radio>
      <Radio
        disabled
        value={1}
      >
        One
      </Radio>
      <Radio value={2}>
        Two
      </Radio>
    </RadioGroup>
  )
}
// END-SOURCE
// END-DEMO

export const Row = RadioGroupRow.bind({}) as any

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-progressbar--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <RadioGroup {...args} />
  ),
  'RadioGroup',
  ['Children']
).bind({}) as any
Parts.args = {
  children: [
    <Radio value={0} />,
    <Radio value={1} />,
    <Radio value={2} />,
  ],
}
