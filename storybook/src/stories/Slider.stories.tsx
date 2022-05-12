import React, { useState } from 'react'
import { Slider } from 'honorable'

export default {
  title: 'Slider',
  component: Slider,
}

function Template(args: any) {
  const [value, setValue] = useState(args.initialValue)

  return (
    <Slider
      {...args}
      value={value}
      onChange={(event, value) => setValue(value)}
    />
  )
}

function Template2(args: any) {
  const [values, setValues] = useState<number[]>(args.initialValues)

  return (
    <Slider
      {...args}
      value={values}
      onChange={(event, value, index) => {
        const nextValues = [...values]

        nextValues[index] = value

        setValues(nextValues)
      }}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  initialValue: 0,
}

export const Step = Template.bind({})
Step.args = {
  initialValue: 0,
  step: 0.1,
}

export const Min = Template.bind({})
Min.args = {
  initialValue: 0,
  min: 0.5,
}

export const Max = Template.bind({})
Max.args = {
  initialValue: 0,
  max: 0.75,
}

export const MinMax = Template.bind({})
MinMax.args = {
  initialValue: 1.5,
  min: 1,
  max: 2.75,
}

export const MinMaxStep = Template.bind({})
MinMaxStep.args = {
  initialValue: 150,
  min: 100,
  max: 200,
  step: 10,
}

export const Marks = Template.bind({})
Marks.args = {
  initialValue: 0,
  marks: [
    { value: 0, label: '0%' },
    { value: 0.5, label: '50%' },
    { value: 1, label: '100%' },
  ],
}

export const MinMaxStepMarks = Template.bind({})
MinMaxStepMarks.args = {
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
  initialValues: [0, 0.5],
}

export const Multiple2MinMaxStep = Template2.bind({})
Multiple2MinMaxStep.args = {
  initialValues: [100, 150],
  min: 100,
  max: 200,
  step: 10,
}

export const Multiple3 = Template2.bind({})
Multiple3.args = {
  initialValues: [0, 0.5, 0.75],
}

export const Multiple3MinMaxStep = Template2.bind({})
Multiple3MinMaxStep.args = {
  initialValues: [100, 150, 200],
  min: 100,
  max: 200,
  step: 10,
}

export const Multiple4 = Template2.bind({})
Multiple4.args = {
  initialValues: [0, 0.5, 0.75, 1],
}

export const Multiple4MinMaxStep = Template2.bind({})
Multiple4MinMaxStep.args = {
  initialValues: [100, 150, 175, 185],
  min: 100,
  max: 200,
  step: 10,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Slider',
  min: 0.5,
}
