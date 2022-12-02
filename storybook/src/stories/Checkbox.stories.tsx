import React, { useState } from 'react'

import { A, Checkbox, Div, Flex, P } from 'honorable'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
}

function Template(args: any) {
  return (
    <Checkbox
      {...args}
    />
  )
}

function Template2(args: any) {
  const [checked, setChecked] = useState(false)

  return (
    <Flex>
      <Checkbox
        checked={checked}
        onChange={event => setChecked(event.target.checked)}
        {...args}
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

function Template3(args: any) {
  return (
    <Div>
      <Checkbox
        {...args}
      />
      <Checkbox
        {...args}
      />
      <Checkbox
        {...args}
      />
      <Checkbox
        {...args}
      />
    </Div>
  )
}

export const Default = Template.bind({}) as any
Default.args = {
  disabled: false,
}

export const Controlled = Template2.bind({}) as any
Controlled.args = {
  disabled: false,
}

export const Disabled = Template.bind({}) as any
Disabled.args = {
  disabled: true,
  children: 'A checkbox',
}

export const Label = Template.bind({}) as any
Label.args = {
  disabled: false,
  children: 'A checkbox',
}

export const LabelPositionLeft = Template.bind({}) as any
LabelPositionLeft.args = {
  disabled: false,
  children: 'A checkbox',
  labelPosition: 'left',
}

export const LabelPositionTop = Template.bind({}) as any
LabelPositionTop.args = {
  disabled: false,
  children: 'A checkbox',
  labelPosition: 'top',
}

export const LabelPositionBottom = Template.bind({}) as any
LabelPositionBottom.args = {
  disabled: false,
  children: 'A checkbox',
  labelPosition: 'bottom',
}

export const LabelSmall = Template.bind({}) as any
LabelSmall.args = {
  disabled: false,
  children: (
    <P fontSize="0.5rem">
      A checkbox
    </P>
  ),
}

export const Multiple = Template3.bind({}) as any
Multiple.args = {
  disabled: false,
  children: 'A checkbox',
}

export const MultipleLabelSmall = Template3.bind({}) as any
MultipleLabelSmall.args = {
  disabled: false,
  children: (
    <P fontSize="0.5rem">
      A checkbox
    </P>
  ),
}
