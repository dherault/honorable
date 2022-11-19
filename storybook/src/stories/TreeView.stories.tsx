import React, { useState } from 'react'
import { Button, TreeView } from 'honorable'

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

function Template() {

  function renderTreeView(items: any[]) {
    return items.map(item => (
      <TreeView
        key={item.id}
        label={item.label}
      >
        {item.children.length > 0 && renderTreeView(item.children)}
      </TreeView>
    ))
  }

  return (
    <TreeView label="Hierarchy">
      {renderTreeView(items)}
    </TreeView>
  )
}

function Template2() {
  const [expanded, setExpanded] = useState(false)

  function renderTreeView(items: any[]) {
    return items.map(item => (
      <TreeView
        expanded={expanded}
        onExpand={setExpanded}
        key={item.id}
        label={item.label}
      >
        {item.children.length > 0 && renderTreeView(item.children)}
      </TreeView>
    ))
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

export const Default = Template.bind({}) as any
Default.args = {}

export const Controlled = Template2.bind({}) as any
Controlled.args = {}
