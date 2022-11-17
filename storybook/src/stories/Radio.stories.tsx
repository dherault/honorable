import React, { useState } from 'react'

import { A, Flex, P, Radio } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Components/Radio',
  component: Radio,
}

function Template(args: any) {
  return (
    <Radio
      {...args}
    />
  )
}

function Template2(args: any) {
  const [checked, setChecked] = useState(false)

  return (
    <Flex>
      <Radio
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
  children: 'A Radio',
}

export const Label = Template.bind({}) as any
Label.args = {
  disabled: false,
  children: 'A Radio',
}

export const LabelPositionLeft = Template.bind({}) as any
LabelPositionLeft.args = {
  disabled: false,
  children: 'A Radio',
  labelPosition: 'left',
}

export const LabelPositionTop = Template.bind({}) as any
LabelPositionTop.args = {
  disabled: false,
  children: 'A Radio',
  labelPosition: 'top',
}

export const LabelPositionBottom = Template.bind({}) as any
LabelPositionBottom.args = {
  disabled: false,
  children: 'A Radio',
  labelPosition: 'bottom',
}

export const LabelSmall = Template.bind({}) as any
LabelSmall.args = {
  disabled: false,
  children: (
    <P fontSize="0.5rem">
      A Radio
    </P>
  ),
}
