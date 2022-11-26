import React, { useState } from 'react'
import { Slider } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Components/Slider',
  component: Slider,
}

function Template({ initialValue, isVertical, ...props }: any) {
  const [value, setValue] = useState(initialValue)

  return (
    <>
      {value}
      <Slider
        {...props}
        orientation={isVertical ? 'vertical' : 'horizontal'}
        value={value}
        onChange={(event, value) => setValue(value)}
        mt={1}
      />
    </>
  )
}

function Template2({ initialValues, isVertical, ...props }: any) {
  const [values, setValues] = useState<number[]>(initialValues)

  return (
    <>
      {values.join(' ')}
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
    </>
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

export const Default = Template.bind({}) as any
Default.args = {
  isVertical: false,
  initialValue: 0,
}

export const KnobSize = Template.bind({}) as any
KnobSize.args = {
  isVertical: false,
  initialValue: 0,
  knobSize: 42,
}

export const Step = Template.bind({}) as any
Step.args = {
  isVertical: false,
  initialValue: 0,
  step: 0.1,
}

export const Min = Template.bind({}) as any
Min.args = {
  isVertical: false,
  initialValue: 0.6,
  min: 0.5,
}

export const Max = Template.bind({}) as any
Max.args = {
  isVertical: false,
  initialValue: 0.1,
  max: 0.75,
}

export const MinMax = Template.bind({}) as any
MinMax.args = {
  isVertical: false,
  initialValue: 0,
  min: -8,
  max: 4,
}

export const MinMax2 = Template.bind({}) as any
MinMax2.args = {
  isVertical: false,
  initialValue: 2,
  min: -8,
  max: 4,
}

export const MinMaxEqualMinus = Template.bind({}) as any
MinMaxEqualMinus.args = {
  isVertical: false,
  initialValue: 0,
  min: -10,
  max: 10,
}

export const MinMaxStep = Template.bind({}) as any
MinMaxStep.args = {
  isVertical: false,
  initialValue: 150,
  min: 100,
  max: 200,
  step: 10,
}

export const Marks = Template.bind({}) as any
Marks.args = {
  isVertical: false,
  initialValue: 0,
  marks: [
    { value: 0, label: '0%' },
    { value: 0.5, label: '50%' },
    { value: 1, label: '100%' },
  ],
}

export const MarksNoLabel = Template.bind({}) as any
MarksNoLabel.args = {
  isVertical: false,
  initialValue: 0,
  marks: [
    { value: 0 },
    { value: 0.5 },
    { value: 1 },
  ],
}

export const MinMaxStepMarks = Template.bind({}) as any
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

export const Multiple2 = Template2.bind({}) as any
Multiple2.args = {
  isVertical: false,
  initialValues: [0, 0.5],
}

export const Multiple2NoSwap = Template2.bind({}) as any
Multiple2NoSwap.args = {
  isVertical: false,
  initialValues: [0, 0.5],
  noSwap: true,
}

export const Multiple2MinMaxStep = Template2.bind({}) as any
Multiple2MinMaxStep.args = {
  isVertical: false,
  initialValues: [100, 150],
  min: 100,
  max: 200,
  step: 10,
}

export const Multiple3 = Template2.bind({}) as any
Multiple3.args = {
  isVertical: false,
  initialValues: [0, 0.5, 0.75],
}

export const Multiple3MinMaxStep = Template2.bind({}) as any
Multiple3MinMaxStep.args = {
  isVertical: false,
  initialValues: [100, 150, 200],
  min: 100,
  max: 200,
  step: 10,
}

export const Multiple4 = Template2.bind({}) as any
Multiple4.args = {
  isVertical: false,
  initialValues: [0, 0.5, 0.75, 1],
}

export const Multiple4MinMaxStep = Template2.bind({}) as any
Multiple4MinMaxStep.args = {
  isVertical: false,
  initialValues: [100, 150, 175, 185],
  min: 100,
  max: 200,
  step: 10,
}

export const Multiple4MinMaxStepNoSwap = Template2.bind({}) as any
Multiple4MinMaxStepNoSwap.args = {
  isVertical: false,
  initialValues: [100, 150, 175, 185],
  min: 100,
  max: 200,
  step: 10,
  noSwap: true,
}

export const Uncontrolled = Template3.bind({}) as any
Uncontrolled.args = {
  isVertical: false,
}

export const UncontrolledDefaultValue = Template3.bind({}) as any
UncontrolledDefaultValue.args = {
  isVertical: false,
  defaultValue: 0.5,
}

export const UncontrolledDefaultValues = Template3.bind({}) as any
UncontrolledDefaultValues.args = {
  isVertical: false,
  defaultValue: [0.25, 0.75],
}

export const LabelTooltipDisplayAuto = Template.bind({}) as any
LabelTooltipDisplayAuto.args = {
  isVertical: false,
  initialValue: 0,
  labelTooltipDisplay: 'auto',
}

export const LabelTooltipDisplayOn = Template.bind({}) as any
LabelTooltipDisplayOn.args = {
  isVertical: false,
  initialValue: 0,
  labelTooltipDisplay: 'on',
}

export const Disabled = Template.bind({}) as any
Disabled.args = {
  isVertical: false,
  disabled: true,
}
