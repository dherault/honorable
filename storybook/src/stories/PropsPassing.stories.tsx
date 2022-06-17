import React from 'react'
import { A, Accordion, Div, ExtendTheme, Flex, P } from 'honorable'

export default {
  title: 'Props Passing',
}

function Template1() {
  return (
    <P align="center">
      I have an `align="center"` prop, is it passed to the DOM?
    </P>
  )
}

export const AlignCenter = Template1.bind({})
AlignCenter.args = {
}

function Template2() {
  return (
    <>
      <Div
        as="a"
        href="#"
      >
        I should be a `a` element although I'm a `Div`.
      </Div>
      <Div
        as={A}
        href="#"
      >
        I should be a `A` element although I'm a `Div`.
      </Div>
    </>
  )
}

export const AsAnchor = Template2.bind({})
AsAnchor.args = {
}

const borderRadiuses = {
  normal: 6,
}

function Template3() {
  return (
    <ExtendTheme
      theme={{
        global: [
          ({ borderRadius }: any) => typeof borderRadius !== 'undefined' && {
            borderRadius: borderRadiuses[borderRadius] || borderRadius,
          },
        ],
      }}
    >
      <Div
        p={0.5}
        borderRadius="normal"
        backgroundColor="blue"
        color="white"
      >
        I should have a 6px border radius.
      </Div>
      <Flex
        mt={1}
        p={0.5}
        borderRadius="normal"
        backgroundColor="blue"
        color="white"
      >
        I should have a 6px border radius.
      </Flex>
    </ExtendTheme>
  )
}

export const BorderRadius = Template3.bind({})
BorderRadius.args = {
}

function Template4() {
  return (
    <Accordion
      title="I should have a red border bottom"
      borderBottom="1px solid red"
    >
      Do I?
    </Accordion>
  )
}

export const AccordionBorder = Template4.bind({})
AccordionBorder.args = {
}

function Template5() {
  return (
    <ExtendTheme
      theme={{
        A: {
          Root: [
            {
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          ],
        },
      }}
    >
      <A _hover={{ color: 'blue' }}>
        Am I blue with an underline on hover?
      </A>
    </ExtendTheme>
  )
}

export const AnchorHover = Template5.bind({})
AnchorHover.args = {
}
