// Icons from https://icons.modulz.app/
import { useState } from 'react'

import { Accordion, Div } from 'honorable'

export default {
  title: 'Accordion',
  component: Accordion,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

function Template(args) {
  return (
    <Div
      p={2}
      backgroundColor="background-light"
    >
      <Accordion {...args} />
      <Accordion {...args} />
      <Accordion {...args} />
    </Div>
  )
}

function TemplateSolo(args) {
  return (
    <Div
      p={2}
      backgroundColor="background-light"
    >
      <Accordion {...args} />
    </Div>
  )
}

function TemplateControlled(args) {
  const [expanded, setExpanded] = useState(null)

  return (
    <Div
      p={2}
      backgroundColor="background-light"
    >
      <Accordion
        {...args}
        onExpand={() => setExpanded(1)}
        expanded={expanded === 1}
      />
      <Accordion
        {...args}
        onExpand={() => setExpanded(2)}
        expanded={expanded === 2}
      />
      <Accordion
        {...args}
        onExpand={() => setExpanded(3)}
        expanded={expanded === 3}
      />
    </Div>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: 'An Accordion',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  disabled: false,
}

export const ExpandIcon = Template.bind({})
ExpandIcon.args = {
  title: 'An Accordion',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  disabled: false,
  expandIcon: (
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
  ),
}

export const Solo = TemplateSolo.bind({})
Solo.args = {
  title: 'An Accordion',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  disabled: false,
}

export const Controlled = TemplateControlled.bind({})
Controlled.args = {
  title: 'An Accordion',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  disabled: false,
}

export const DefaultExpanded = TemplateSolo.bind({})
DefaultExpanded.args = {
  title: 'An Accordion',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  disabled: false,
  defaultExpanded: true,
}
