import React, { ComponentType, useEffect, useState } from 'react'
import { Div, ExtendTheme, Table, Tbody, Td, Tr } from 'honorable'

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

const createId = (x: string) => `__HONORABLE__${x}`

function cssPath(el: Element, parent: Element) {
  if (!(el instanceof Element)) return

  const path = []

  while (el && el.nodeType === Node.ELEMENT_NODE && el !== parent) {
    let selector = el.nodeName.toLowerCase()
    let sib = el
    let nth = 1

    while (sib = sib.previousElementSibling) {
      if (sib.nodeName.toLowerCase() === selector) nth++
    }

    if (nth !== 1) {
      if (nth === el.parentElement.childElementCount) selector += ':last-of-type'
      else selector += `:nth-of-type(${nth})`
    }

    path.unshift(selector)
    el = el.parentElement
  }

  return `& > ${path.join(' > ')}`
}

function createPartsTemplate(Component: ComponentType<any>, name: string, parts: string[]) {
  const extendedTheme = {
    [name]: {
      Root: [
        {
          id: createId('Root'),
          border: `2px solid ${rootColor}`,
          padding: '0.5rem',
        },
      ],
      ...parts.reduce((accumulator, part, i) => ({
        ...accumulator,
        [part]: [
          {
            id: createId(part),
            border: `2px solid ${partColors[i]}`,
            padding: '0.5rem',
          },
        ],
      }), {}),
    },
  }

  return function Template(args: any) {
    const [paths, setPaths] = useState({})

    useEffect(() => {
      const root = document.getElementById(createId('Root'))

      parts.forEach(part => {
        const element = document.getElementById(createId(part))

        setPaths(x => ({ ...x, [part]: cssPath(element, root) }))
      })
    }, [])

    return (
      <ExtendTheme theme={extendedTheme}>
        <Component {...args} />
        <Div mt={2}>
          <Table>
            <Tbody>
              <Tr>
                <Td>
                  <Div
                    width={24}
                    height={2}
                    backgroundColor={rootColor}
                  />
                </Td>
                <Td>
                  Root
                </Td>
                <Td />
              </Tr>
              {parts.map((part, i) => (
                <Tr key={part}>
                  <Td>
                    <Div
                      width={24}
                      height={2}
                      backgroundColor={partColors[i]}
                    />
                  </Td>
                  <Td>
                    {part}
                  </Td>
                  <Td fontSize={12}>
                    {paths[part]}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Div>
      </ExtendTheme>
    )
  }
}

export default createPartsTemplate
