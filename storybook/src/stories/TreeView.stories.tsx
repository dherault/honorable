import React, { useState } from 'react'
import { Button, Div, TreeView } from 'honorable'

export default {
  title: 'Components/TreeView',
  component: TreeView,
}

const items: any[] = []

function createItems(items, maxDepth, depth = 0) {
  for (let i = 0; i < 5; i++) {
    const item = {
      id: `${depth}-${i}`,
      label: `Item ${depth}-${i}`,
      children: [],
    }

    items.push(item)

    if (depth < maxDepth) {
      createItems(item.children, maxDepth, depth + 1)
    }
  }
}

createItems(items, 3)

function Template(args: any) {
  function renderTreeView(items: any[]) {
    return items.map(item => {
      if (!item || item.label.endsWith('4')) return null

      return (
        <TreeView
          key={item.id}
          label={item.label}
          {...args}
        >
          {renderTreeView(item.children)}
        </TreeView>
      )
    })
  }

  return (
    <TreeView
      label="Hierarchy"
      {...args}
    >
      {renderTreeView(items)}
    </TreeView>
  )
}

function Template2() {
  const [expanded, setExpanded] = useState(false)

  function renderTreeView(items: any[]) {
    return items.map(item => {
      if (!item) return null

      return (
        <TreeView
          expanded={expanded}
          onExpand={setExpanded}
          key={item.id}
          label={item.label}
        >
          {renderTreeView(item.children)}
        </TreeView>
      )
    })
  }

  return (
    <>
      <Button onClick={() => setExpanded(x => !x)}>
        Toggle
      </Button>
      <TreeView
        label="Hierarchy"
        expanded={expanded}
        onExpand={setExpanded}
      >
        {renderTreeView(items)}
      </TreeView>
    </>
  )
}

function Template3() {
  function renderTreeView(items: any[]) {
    return items.map(item => {
      if (!item) return null

      return (
        <TreeView
          key={item.id}
          label={<Div color="lightskyblue">{item.label}</Div>}
        >
          {renderTreeView(item.children)}
        </TreeView>
      )
    })
  }

  return (
    <TreeView label="Hierarchy">
      {renderTreeView(items)}
    </TreeView>
  )
}

export const Default = Template.bind({}) as any
Default.args = {}

export const DefaultExpanded = Template.bind({}) as any
DefaultExpanded.args = {
  defaultExpanded: true,
}

export const Controlled = Template2.bind({}) as any
Controlled.args = {}

export const LabelNode = Template3.bind({}) as any
LabelNode.args = {}

export const NoBar = Template.bind({}) as any
NoBar.args = {
  defaultExpanded: true,
  noBar: true,
}

export const BarColor = Template.bind({}) as any
BarColor.args = {
  defaultExpanded: true,
  barColor: 'deepskyblue',
}
