// Icons from https://icons.modulz.app/
import React, { useState } from 'react'
import { Input, P } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Components/Input',
  component: Input,
}

function Template(args: any) {
  return (
    <Input {...args} />
  )
}

function TemplateControlled(args: any) {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      onChange={event => setValue(event.target.value)}
      {...args}
    />
  )
}

function TemplateCounter(args: any) {
  const [counter, setCounter] = useState(0)

  return (
    <>
      <Input
        {...args}
        onEnter={() => setCounter(x => x + 1)}
      />
      <P mt={1}>
        {counter}
      </P>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  disabled: false,
}

export const Width100 = Template.bind({})
Width100.args = {
  disabled: false,
  width: '100%',
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  disabled: false,
  placeholder: 'Type me if you can!',
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  defaultValue: 'Text me if you can',
  disabled: false,
}

export const Controlled = TemplateControlled.bind({})
Controlled.args = {
  disabled: false,
}

export const TypeNumber = Template.bind({})
TypeNumber.args = {
  type: 'number',
  disabled: false,
}

export const AutoFocus = Template.bind({})
AutoFocus.args = {
  disabled: false,
  autoFocus: true,
}

export const StartIcon = Template.bind({})
StartIcon.args = {
  disabled: false,
  startIcon: (
    <svg
      width={16}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
}

export const EndIcon = Template.bind({})
EndIcon.args = {
  disabled: false,
  endIcon: (
    <svg
      width={16}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
}

export const EndIconKg = Template.bind({})
EndIconKg.args = {
  disabled: false,
  endIcon: (
    <P color="darken(border, 15)">
      kg
    </P>
  ),
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const Multiline = Template.bind({})
Multiline.args = {
  multiline: true,
  disabled: false,
}

export const MultilineControlled = TemplateControlled.bind({})
MultilineControlled.args = {
  multiline: true,
  disabled: false,
}

export const MultilineMinRows = Template.bind({})
MultilineMinRows.args = {
  multiline: true,
  minRows: 2,
  disabled: false,
}

export const MultilineMaxRows = Template.bind({})
MultilineMaxRows.args = {
  multiline: true,
  maxRows: 4,
  disabled: false,
}

export const MultilineMinRowsMaxRows = Template.bind({})
MultilineMinRowsMaxRows.args = {
  multiline: true,
  minRows: 2,
  maxRows: 4,
  disabled: false,
}

export const MultilineStartIcon = Template.bind({})
MultilineStartIcon.args = {
  multiline: true,
  disabled: false,
  startIcon: (
    <svg
      width={16}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
}

export const MultilineEndIcon = Template.bind({})
MultilineEndIcon.args = {
  multiline: true,
  disabled: false,
  endIcon: (
    <svg
      width={16}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
}

export const MultilineDisabled = Template.bind({})
MultilineDisabled.args = {
  multiline: true,
  disabled: true,
}

export const OnEnter = TemplateCounter.bind({})
OnEnter.args = {
  multiline: false,
  disabled: false,
}
