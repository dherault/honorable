// Icons from https://icons.modulz.app/
import React, { useState } from 'react'
import { Slider } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Slider',
  component: Slider,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-slider--basic&viewMode=story
// START-SOURCE
function SliderBasic() {
  const [value, setValue] = useState(0)

  return (
    <>
      <Slider
        value={value}
        onChange={(event, value) => setValue(value)}
      />
      <Slider
        mt={2}
        disabled
        value={value}
        onChange={(event, value) => setValue(value)}
      />
    </>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = SliderBasic.bind({})

// START-DEMO
// @name KnobSize
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-slider--knob-size&viewMode=story
// START-SOURCE
function SliderKnobSize() {
  const [value, setValue] = useState(0)

  return (
    <Slider
      value={value}
      knobSize={42}
      onChange={(event, value) => setValue(value)}
    />
  )
}
// END-SOURCE
// END-DEMO

export const KnobSize = SliderKnobSize.bind({})

// START-DEMO
// @name Step
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-slider--step&viewMode=story
// START-SOURCE
function SliderStep() {
  const [value, setValue] = useState(0)

  return (
    <Slider
      value={value}
      step={0.1}
      onChange={(event, value) => setValue(value)}
    />
  )
}
// END-SOURCE
// END-DEMO

export const Step = SliderStep.bind({})

// START-DEMO
// @name MinMax
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-slider--min-max&viewMode=story
// START-SOURCE
function SliderMinMax() {
  const [value, setValue] = useState(0.6)

  return (
    <>
      <Slider
        value={value}
        onChange={(event, value) => setValue(value)}
        min={0.5}
      />
      <Slider
        value={value}
        onChange={(event, value) => setValue(value)}
        max={0.75}
      />
    </>
  )
}
// END-SOURCE
// END-DEMO

export const MinMax = SliderMinMax.bind({})

// START-DEMO
// @name Marks
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-slider--marks&viewMode=story
// START-SOURCE
function SliderMarks() {
  const [value, setValue] = useState(0.6)

  return (
    <>
      <Slider
        value={value}
        onChange={(event, value) => setValue(value)}
        marks={[
          { value: 0, label: '0' },
          { value: 0.25, label: '25%' },
          { value: 0.5, label: '5%' },
          { value: 0.75, label: '75%' },
          { value: 1, label: '100%' },
        ]}
      />
      <Slider
        mt={2}
        value={value}
        onChange={(event, value) => setValue(value)}
        marks={[
          { value: 0 },
          { value: 0.25 },
          { value: 0.5 },
          { value: 0.75 },
          { value: 1 },
        ]}
      />
    </>
  )
}

export const Marks = SliderMarks.bind({}) 

// START-DEMO
// @name Multiple
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-slider--multiple&viewMode=story
// START-SOURCE
function SliderMultiple() {
  const [value, setValue] = useState([0, 0.5])

  return (
    <>
      <Slider
        value={value}
        onChange={(event, value) => setValue(value)}
      />
      <Slider
        mt={2}
        value={value}
        noSwap
        onChange={(event, value) => setValue(value)}
      />
    </>
  )
}
// END-SOURCE
// END-DEMO

export const Multiple = SliderMultiple.bind({})

// START-DEMO
// @name Uncontrolled
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-slider--uncontrolled&viewMode=story
// START-SOURCE
function SliderUncontrolled() {

  return (
    <>
      <Slider />
      <Slider
        mt={2}
        defaultValue={0.5}
      />
    </>
  )
}
// END-SOURCE
// END-DEMO

export const Uncontrolled = SliderUncontrolled.bind({})

// START-DEMO
// @name LabelTooltip
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-slider--label-tooltip&viewMode=story
// START-SOURCE
function SliderLabelTooltip() {

  return (
    <>
      <Slider
        labelTooltipDisplay="on"
      />
      <Slider  
        mt={2}
        labelTooltipDisplay="auto"
      />
    </>
  )
}
// END-SOURCE
// END-DEMO

export const LabelTooltip = SliderLabelTooltip.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-slider--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <Slider {...args} />
  ),
  'Slider',
  []
).bind({})
Parts.args = {
  defaultValue: 0.5,
}
