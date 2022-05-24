import React, { ComponentType, ReactNode } from 'react'
import { Div, ExtendTheme, Flex, P } from 'honorable'

const rootColor = 'tomato'
const partColors = [
  'royalblue',
  'chartreuse',
  'gold',
  'darkturquoise',
  'hotpink',
  'orange',
  'blueviolet',
  'darkgreen',
  'darkblue',
  'darkred',
  'darkmagenta',
]

function createPartsTemplate(Component: ComponentType<any>, name: string, parts: string[]) {
  const extendedTheme = {
    [name]: {
      Root: [
        {
          border: `2px solid ${rootColor}`,
          padding: '0.5rem',
        },
      ],
      ...parts.reduce((accumulator, part, i) => ({
        ...accumulator,
        [part]: [
          {
            border: `2px solid ${partColors[i]}`,
            padding: '0.5rem',
          },
        ],
      }), {}),
    },
  }

  return function Template(args: any) {
    return (
      <ExtendTheme theme={extendedTheme}>
        <Component {...args} />
        <Div mt={2}>
          <P mb={0.5}>
            Parts:
          </P>
          <Flex
            align="center"
            mb={0.25}
          >
            <Div
              width={24}
              height={2}
              backgroundColor={rootColor}
            />
            <P ml={0.5}>
              Root
            </P>
          </Flex>
          {parts.map((part, i) => (
            <Flex
              key={part}
              align="center"
              mb={0.25}
            >
              <Div
                width={24}
                height={2}
                backgroundColor={partColors[i]}
              />
              <P ml={0.5}>
                {part}
              </P>
            </Flex>
          ))}
        </Div>
      </ExtendTheme>
    )
  }
}

export default createPartsTemplate
