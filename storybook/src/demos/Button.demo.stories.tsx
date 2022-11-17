// Icons from https://icons.modulz.app/
import React from 'react'
import { Button } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Button',
  component: Button,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-button--basic&viewMode=story
// START-SOURCE
function ButtonBasicDemo() {
  return (
    <>
      <Button mb={0.5}>Button</Button>
      <Button
        mb={0.5}
        width="100%"
      >
        Button
      </Button>
    </>
  )
}
// END-SOURCE
// END-DEMO

export const Basic = ButtonBasicDemo.bind({}) as any

// START-DEMO
// @name StartIcon
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-button--start-icon&viewMode=story
// START-SOURCE
function ButtonStartIconDemo() {
  return (
    <>
      <Button
        mb={0.5}
        startIcon={(
          <svg
            width={16}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.1465 1.48959C7.34176 1.29432 7.65835 1.29432 7.85361 1.48959L13.5105 7.14644C13.7057 7.3417 13.7057 7.65829 13.5105 7.85355L7.85361 13.5104C7.65835 13.7057 7.34176 13.7057 7.1465 13.5104L1.48965 7.85355C1.29439 7.65829 1.29439 7.3417 1.48965 7.14644L7.1465 1.48959ZM7.50005 2.55025L2.55031 7.49999L7.50005 12.4497L12.4498 7.49999L7.50005 2.55025Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        )}
      >
        Button
      </Button>
      <Button
        mb={0.5}
        startIcon={(
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
      >
        Button
      </Button>
    </>
  )
}
// END-SOURCE
// END-DEMO

export const StartIcon = ButtonStartIconDemo.bind({}) as any

// START-DEMO
// @name EndIcon
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-button--end-icon&viewMode=story
// START-SOURCE
function ButtonEndIconDemo() {
  return (
    <>
      <Button
        mb={0.5}
        endIcon={(
          <svg
            width={16}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.1465 1.48959C7.34176 1.29432 7.65835 1.29432 7.85361 1.48959L13.5105 7.14644C13.7057 7.3417 13.7057 7.65829 13.5105 7.85355L7.85361 13.5104C7.65835 13.7057 7.34176 13.7057 7.1465 13.5104L1.48965 7.85355C1.29439 7.65829 1.29439 7.3417 1.48965 7.14644L7.1465 1.48959ZM7.50005 2.55025L2.55031 7.49999L7.50005 12.4497L12.4498 7.49999L7.50005 2.55025Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        )}
      >
        Button
      </Button>
      <Button
        mb={0.5}
        endIcon={(
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
      >
        Button
      </Button>
    </>
  )
}
// END-SOURCE
// END-DEMO

export const EndIcon = ButtonEndIconDemo.bind({}) as any

// START-DEMO
// @name Loading
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-button--loading&viewMode=story
// START-SOURCE
function ButtonLoadingDemo() {
  return (
    <>
      <Button
        mb={0.5}
        loading
      >
        Button
      </Button>
      <Button
        mb={0.5}
        loading
        width="100%"
      >
        Button
      </Button>
      <Button
        mb={0.5}
        loading
        loadingIndicator="Loading..."
      >
        Button
      </Button>
      <Button
        mb={0.5}
        loading
        loadingIndicator="Loading..."
      >
        x
      </Button>
    </>
  )
}

// END-SOURCE
// END-DEMO

export const Loading = ButtonLoadingDemo.bind({}) as any

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-button--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <>
      <Button {...args} />
      <Button
        mt={0.5}
        loading
        {...args}
      />
    </>
  ),
  'Button',
  ['StartIcon', 'LoadingIndicator', 'Spinner', 'Children', 'EndIcon']
).bind({}) as any
Parts.args = {
  children: 'Button',
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
