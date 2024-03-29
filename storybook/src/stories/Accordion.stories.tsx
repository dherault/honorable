// Icons from https://icons.modulz.app/
import React, { useState } from 'react'

import { Accordion, Button, Checkbox, Div, Input } from 'honorable'

export default {
  title: 'Components/Accordion',
  component: Accordion,
}

// START-DEMO
// Uncontrolled
// https://storybook.honorable.design/iframe.html?args=&id=accordion--demo&viewMode=story
function AccordionUncontrolled() {
  return (
    <>
      <Accordion title="Our vision">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Accordion>
      <Accordion title="Our mission">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Accordion>
      <Accordion title="Our values">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Accordion>
    </>
  )
}
// END-DEMO

export const DemoUncontrolled = AccordionUncontrolled.bind({}) as any
DemoUncontrolled.args = {
}

function Template(args: any) {
  return (
    <>
      <Accordion {...args} />
      <Accordion {...args} />
      <Accordion {...args} />
    </>
  )
}

function TemplateSolo(args: any) {
  return (
    <Accordion {...args} />
  )
}

function TemplateBorderTitle(args: any) {
  return (
    <Accordion
      title={(
        <Div borderBottom="1px solid red">
          title prop and ExpandIconWrapper part have a red borde, Title part has a blue border
        </Div>
      )}
      TitleProps={{ borderBottom: '1px solid blue' }}
      ExpandIconWrapperProps={{ borderBottom: '1px solid red' }}
      {...args}
    />
  )
}

function TemplateResponsive(args: any) {
  const [n, setN] = useState(1)

  return (
    <>
      <Button onClick={() => setN(n + 1)}>
        Add child
      </Button>
      <Accordion
        defaultExpanded
        marginTop={16}
        {...args}
      >
        <Input
          multiline
          width="100%"
        />
        {Array(n).fill(true).map((_, i) => (
          <Div mt={0.5}>
            {i}
          </Div>
        ))}
      </Accordion>
    </>
  )
}

function TemplateControlled(args: any) {
  const [expanded, setExpanded] = useState(-1)

  return (
    <>
      <Accordion
        {...args}
        onExpand={() => setExpanded(expanded === 1 ? -1 : 1)}
        expanded={expanded === 1}
      />
      <Accordion
        {...args}
        onExpand={() => setExpanded(expanded === 2 ? -1 : 2)}
        expanded={expanded === 2}
      />
      <Accordion
        {...args}
        onExpand={() => setExpanded(expanded === 3 ? -1 : 3)}
        expanded={expanded === 3}
      />
    </>
  )
}

export const Default = Template.bind({}) as any
Default.args = {
  title: 'An Accordion',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}

export const ExpandIcon = Template.bind({}) as any
ExpandIcon.args = {
  title: 'An Accordion',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  expandIcon: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.07505 4.10001C5.07505 2.91103 6.25727 1.92502 7.50005 1.92502C8.74283 1.92502 9.92505 2.91103 9.92505 4.10001C9.92505 5.19861 9.36782 5.71436 8.61854 6.37884L8.58757 6.4063C7.84481 7.06467 6.92505 7.87995 6.92505 9.5C6.92505 9.81757 7.18248 10.075 7.50005 10.075C7.81761 10.075 8.07505 9.81757 8.07505 9.5C8.07505 8.41517 8.62945 7.90623 9.38156 7.23925L9.40238 7.22079C10.1496 6.55829 11.075 5.73775 11.075 4.10001C11.075 2.12757 9.21869 0.775024 7.50005 0.775024C5.7814 0.775024 3.92505 2.12757 3.92505 4.10001C3.92505 4.41758 4.18249 4.67501 4.50005 4.67501C4.81761 4.67501 5.07505 4.41758 5.07505 4.10001ZM7.50005 13.3575C7.9833 13.3575 8.37505 12.9657 8.37505 12.4825C8.37505 11.9992 7.9833 11.6075 7.50005 11.6075C7.0168 11.6075 6.62505 11.9992 6.62505 12.4825C6.62505 12.9657 7.0168 13.3575 7.50005 13.3575Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
}

export const Solo = TemplateSolo.bind({}) as any
Solo.args = {
  title: 'An Accordion',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}

export const InvertExpandIcon = TemplateSolo.bind({}) as any
InvertExpandIcon.args = {
  title: 'An Accordion',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  invertExpandIcon: true,
}

export const Responsive = TemplateResponsive.bind({}) as any
Responsive.args = {
  title: 'An Accordion',
}

export const BorderTitle = TemplateBorderTitle.bind({}) as any
BorderTitle.args = {
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}

export const Controlled = TemplateControlled.bind({}) as any
Controlled.args = {
  title: 'An Accordion',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}

export const DefaultExpanded = TemplateSolo.bind({}) as any
DefaultExpanded.args = {
  title: 'An Accordion',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  defaultExpanded: true,
}

export const WithCheckboxes = Template.bind({}) as any
WithCheckboxes.args = {
  title: 'An Accordion',
  children: (
    <Checkbox>Checkbox</Checkbox>
  ),
}

export const WithAbsoluteChildren = TemplateSolo.bind({}) as any
WithAbsoluteChildren.args = {
  title: 'An Accordion',
  children: (
    <Div
      position="relative"
      width={64}
      height={64}
    >
      <Div
        position="absolute"
        top={-100}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="red"
      />
    </Div>
  ),
}
