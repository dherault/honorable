// Icons from https://icons.modulz.app/
import React, { useState } from 'react'
import { Input, P } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Input',
  component: Input,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-input--basic&viewMode=story
// START-SOURCE
function InputBasic() {
  return (
    <Input />
  )
}
// END-SOURCE
// END-DEMO

export const Basic = InputBasic.bind({})

// START-DEMO
// @name Width100
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-input--width&viewMode=story
// START-SOURCE
function InputWidth100() {
  return (
    <Input width="100%" />
  )
}
// END-SOURCE
// END-DEMO

export const Width100 = InputWidth100.bind({})

// START-DEMO
// @name Placeholder
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-input--placeholder&viewMode=story
// START-SOURCE
function InputPlaceholder() {
  return (
    <Input placeholder="Type me if you can!" />
  )
}
// END-SOURCE
// END-DEMO

export const Placeholder = InputPlaceholder.bind({})

// START-DEMO
// @name DefaultValue
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-input--default-value&viewMode=story
// START-SOURCE
function InputDefaultValue() {
  return (
    <Input defaultValue="Type me if you can!" />
  )
}
// END-SOURCE
// END-DEMO

export const DefaultValue = InputDefaultValue.bind({})

// START-DEMO
// @name TypeNumber
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-input--type-number&viewMode=story
// START-SOURCE
function InputTypeNumber() {
  return (
    <Input type="number" />
  )
}
// END-SOURCE
// END-DEMO

export const TypeNumber = InputTypeNumber.bind({})

// START-DEMO
// @name Controlled
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-input--controlled&viewMode=story
// START-SOURCE
function InputControlled() {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      onChange={event => setValue(event.target.value)}
    />
  )
}
// END-SOURCE
// END-DEMO

export const Controlled = InputControlled.bind({})

// START-DEMO
// @name Counter
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-input--counter&viewMode=story
// START-SOURCE
function InputCounter() {
  const [counter, setCounter] = useState(0)

  return (
    <>
      <Input
        onEnter={() => setCounter(x => x + 1)}
      />
      <P mt={1}>
        {counter}
      </P>
    </>
  )
}
// END-SOURCE
// END-DEMO

export const Counter = InputCounter.bind({})

// START-DEMO
// @name StartIcon
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-input--start-icon&viewMode=story
// START-SOURCE
function InputStartIcon() {
  return (
    <Input startIcon={(
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
    )}
    />
  )
}
// END-SOURCE
// END-DEMO

export const StartIcon = InputStartIcon.bind({})

// START-DEMO
// @name EndIcon
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-input--end-icon&viewMode=story
// START-SOURCE
function InputEndIcon() {
  return (
    <Input endIcon={(
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
    )}
    />
  )
}
// END-SOURCE
// END-DEMO

export const EndIcon = InputEndIcon.bind({})

// START-DEMO
// @name AutoFocus
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-input--auto-focus&viewMode=story
// START-SOURCE
function InputAutoFocus() {
  return (
    <Input autoFocus />
  )
}
// END-SOURCE
// END-DEMO

export const AutoFocus = InputAutoFocus.bind({})

// START-DEMO
// @name Multiline
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-input--multiline&viewMode=story
// START-SOURCE
function InputMultiline() {
  return (
    <Input multiline />
  )
}
// END-SOURCE
// END-DEMO

export const Multiline = InputMultiline.bind({})

// START-DEMO
// @name MultilineMinMaxRows
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-input---multiline-min-max-rows&viewMode=story
// START-SOURCE
function InputMultilineMinMaxRows() {
  return (
    <Input
      multiline
      minRows={2}
      maxRows={4}
    />
  )
}
// END-SOURCE
// END-DEMO

export const MultilineMinMaxRows = InputMultilineMinMaxRows.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-input--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <Input {...args} />
  ),
  'Input',
  ['startIcon', 'endIcon']
).bind({})
Parts.args = {
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
