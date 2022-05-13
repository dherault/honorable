import React, { useState } from 'react'
import { Slider } from 'honorable'

export default {
  title: 'Slider',
  component: Slider,
}

function Template({ initialValue, isVertical, ...props }: any) {
  const [value, setValue] = useState(initialValue)

  return (
    <Slider
      {...props}
      orientation={isVertical ? 'vertical' : 'horizontal'}
      value={value}
      onChange={(event, value) => setValue(value)}
    />
  )
}

function Template2({ initialValues, isVertical, ...props }: any) {
  const [values, setValues] = useState<number[]>(initialValues)

  return (
    <Slider
      {...props}
      orientation={isVertical ? 'vertical' : 'horizontal'}
      value={values}
      onChange={(event, value, index) => {
        const nextValues = [...values]

        nextValues[index] = value

        setValues(nextValues)
      }}
    />
  )
}

function Template3({ isVertical, ...props }: any) {
  return (
    <Slider
      {...props}
      orientation={isVertical ? 'vertical' : 'horizontal'}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  isVertical: false,
  initialValue: 0,
}

export const KnobSize = Template.bind({})
KnobSize.args = {
  isVertical: false,
  initialValue: 0,
  knobSize: 42,
}

export const Step = Template.bind({})
Step.args = {
  isVertical: false,
  initialValue: 0,
  step: 0.1,
}

export const Min = Template.bind({})
Min.args = {
  isVertical: false,
  initialValue: 0.6,
  min: 0.5,
}

export const Max = Template.bind({})
Max.args = {
  isVertical: false,
  initialValue: 0.1,
  max: 0.75,
}

export const MinMax = Template.bind({})
MinMax.args = {
  isVertical: false,
  initialValue: 1.5,
  min: 1,
  max: 2.75,
}

export const MinMaxStep = Template.bind({})
MinMaxStep.args = {
  isVertical: false,
  initialValue: 150,
  min: 100,
  max: 200,
  step: 10,
}

export const Marks = Template.bind({})
Marks.args = {
  isVertical: false,
  initialValue: 0,
  marks: [
    { value: 0, label: '0%' },
    { value: 0.5, label: '50%' },
    { value: 1, label: '100%' },
  ],
}

export const MarksNoLabel = Template.bind({})
MarksNoLabel.args = {
  isVertical: false,
  initialValue: 0,
  marks: [
    { value: 0 },
    { value: 0.5 },
    { value: 1 },
  ],
}

export const MinMaxStepMarks = Template.bind({})
MinMaxStepMarks.args = {
  isVertical: false,
  initialValue: 150,
  min: 100,
  max: 200,
  step: 10,
  marks: [
    { value: 100, label: '100%' },
    { value: 150, label: '150%' },
    { value: 200, label: '200%' },
  ],
}

export const Multiple2 = Template2.bind({})
Multiple2.args = {
  isVertical: false,
  initialValues: [0, 0.5],
}

export const Multiple2NoSwap = Template2.bind({})
Multiple2NoSwap.args = {
  isVertical: false,
  initialValues: [0, 0.5],
  noSwap: true,
}

export const Multiple2MinMaxStep = Template2.bind({})
Multiple2MinMaxStep.args = {
  isVertical: false,
  initialValues: [100, 150],
  min: 100,
  max: 200,
  step: 10,
}

export const Multiple3 = Template2.bind({})
Multiple3.args = {
  isVertical: false,
  initialValues: [0, 0.5, 0.75],
}

export const Multiple3MinMaxStep = Template2.bind({})
Multiple3MinMaxStep.args = {
  isVertical: false,
  initialValues: [100, 150, 200],
  min: 100,
  max: 200,
  step: 10,
}

export const Multiple4 = Template2.bind({})
Multiple4.args = {
  isVertical: false,
  initialValues: [0, 0.5, 0.75, 1],
}

export const Multiple4MinMaxStep = Template2.bind({})
Multiple4MinMaxStep.args = {
  isVertical: false,
  initialValues: [100, 150, 175, 185],
  min: 100,
  max: 200,
  step: 10,
}

export const Multiple4MinMaxStepNoSwap = Template2.bind({})
Multiple4MinMaxStepNoSwap.args = {
  isVertical: false,
  initialValues: [100, 150, 175, 185],
  min: 100,
  max: 200,
  step: 10,
  noSwap: true,
}

export const Uncontrolled = Template3.bind({})
Uncontrolled.args = {
  isVertical: false,
}

export const UncontrolledDefaultValue = Template3.bind({})
UncontrolledDefaultValue.args = {
  isVertical: false,
  defaultValue: 0.5,
}

export const UncontrolledDefaultValues = Template3.bind({})
UncontrolledDefaultValues.args = {
  isVertical: false,
  defaultValue: [0.25, 0.75],
}

export const LabelTooltipDisplayAuto = Template.bind({})
LabelTooltipDisplayAuto.args = {
  isVertical: false,
  initialValue: 0,
  labelTooltipDisplay: 'auto',
}

export const LabelTooltipDisplayOn = Template.bind({})
LabelTooltipDisplayOn.args = {
  isVertical: false,
  initialValue: 0,
  labelTooltipDisplay: 'on',
}

export const Disabled = Template.bind({})
Disabled.args = {
  isVertical: false,
  disabled: true,
}
