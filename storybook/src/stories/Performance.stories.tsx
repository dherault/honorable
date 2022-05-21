import React, { useEffect, useState } from 'react'
import { Div, Flex, H1, Switch } from 'honorable'
import Stats from 'stats.js'

export default {
  title: 'Performance',
  component: Div,
}

function Template(args: any) {
  const [useHonorable, setUseHonorable] = useState(true)
  const nodes = []

  for (let i = 0; i < 32; i++) {
    nodes.push(
      <Node
        key={i}
        useHonorable={useHonorable}
      />
    )
  }

  return (
    <Flex
      direction="column"
      width="100%"
      height="calc(100vh - 64px - 16px)"
      {...args}
    >
      <Flex align="center">
        <H1>Performance test</H1>
        <Switch
          checked={useHonorable}
          ml={2}
          onChange={event => setUseHonorable(event.target.checked)}
        />
      </Flex>
      <Div
        height="100%"
        flexGrow={1}
        border="1px solid border"
        position="relative"
      >
        {nodes}
      </Div>
    </Flex>
  )
}

type PositionType = {
  x: number
  y: number
}

function createPosition() {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
  }
}

function Node({ useHonorable = false }) {
  const [position, setPosition] = useState<PositionType>(createPosition())

  useEffect(() => {
    const stats = new Stats()
    stats.showPanel(0)
    document.body.appendChild(stats.dom)

    let currentX = position.x
    let currentY = position.y
    let objective = createPosition()

    function goToObjective() {
      stats.begin()

      const { x, y } = objective

      const dx = x - currentX
      const dy = y - currentY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 1.5) {
        objective = createPosition()
      }
      else {
        currentX += dx / distance
        currentY += dy / distance

        setPosition({ x: currentX, y: currentY })
      }

      stats.end()

      window.requestAnimationFrame(goToObjective)
    }

    goToObjective()
  // eslint-disable-next-line
  }, [])

  const style = {
    position: 'absolute',
    top: `calc(${position.y}% - 2px)`,
    left: `calc(${position.x}% - 2px)`,
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: 'tomato',
  }

  // @ts-expect-error
  return useHonorable ? <Div {...style} /> : <div style={style} />
}

export const Default = Template.bind({})
Default.args = {
}
