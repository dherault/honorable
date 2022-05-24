// Icons from https://icons.modulz.app/
import React, { useState } from 'react'

import { Accordion } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Accordion Demo',
  component: Accordion,
}

// START-DEMO
// Uncontrolled
// https://storybook.honorable.design/iframe.html?args=&id=accordion-demo--demo-uncontrolled&viewMode=story
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

export const DemoUncontrolled = AccordionUncontrolled.bind({})

// START-DEMO
// Controlled
// https://storybook.honorable.design/iframe.html?args=&id=accordion-demo--demo-controlled&viewMode=story
function AccordionControlled() {
  const [expanded, setExpanded] = useState(-1)

  return (
    <>
      <Accordion
        title="Our vision"
        onExpand={() => setExpanded(expanded === 0 ? -1 : 0)}
        expanded={expanded === 0}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Accordion>
      <Accordion
        title="Our mission"
        onExpand={() => setExpanded(expanded === 1 ? -1 : 1)}
        expanded={expanded === 1}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Accordion>
      <Accordion
        title="Our values"
        onExpand={() => setExpanded(expanded === 2 ? -1 : 2)}
        expanded={expanded === 2}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Accordion>
    </>
  )
}
// END-DEMO

export const DemoControlled = AccordionControlled.bind({})

// START-DEMO
// Uncontrolled
// https://storybook.honorable.design/iframe.html?args=&id=accordion-demo--demo-default-expanded&viewMode=story
function AccordionDefaultExpanded() {
  return (
    <>
      <Accordion
        defaultExpanded
        title="Our vision"
      >
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

export const DemoDefaultExpanded = AccordionDefaultExpanded.bind({})

// START-PARTS
// https://storybook.honorable.design/iframe.html?args=&id=accordion-demo--parts&viewMode=story
// END-PARTS

export const Parts = createPartsTemplate(
  Accordion,
  'Accordion',
  [
    'Title',
    'ExpandIcon',
    'ChildrenWrapper',
    'Children',
  ],
).bind({})

Parts.args = {
  defaultExpanded: true,
  title: 'An Accordion',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}
