// Icons from https://icons.modulz.app/
import React, { useState } from 'react'

import { Accordion } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Accordion',
  component: Accordion,
}

// START-DEMO
// @name Uncontrolled
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-accordion--uncontrolled&viewMode=story
// START-SOURCE
function AccordionUncontrolledDemo() {
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
// END-SOURCE
// END-DEMO

export const Uncontrolled = AccordionUncontrolledDemo.bind({})

// START-DEMO
// @name Controlled
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-accordion--controlled&viewMode=story
// START-SOURCE
function AccordionControlledDemo() {
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
// END-SOURCE
// END-DEMO

export const Controlled = AccordionControlledDemo.bind({})

// START-DEMO
// @name Default expanded
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-accordion--expanded&viewMode=story
// START-SOURCE
function AccordionDefaultExpandedDemo() {
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
// END-SOURCE
// END-DEMO

export const DefaultExpanded = AccordionDefaultExpandedDemo.bind({})

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-accordion--parts&viewMode=story
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
