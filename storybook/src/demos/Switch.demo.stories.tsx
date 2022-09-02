// Icons from https://icons.modulz.app/
import React, { useState } from 'react'
import { Div, Switch } from 'honorable'

import createPartsTemplate from '../helpers/createPartsTemplate'

export default {
  title: 'Demos/Switch',
  component: Switch,
}

// START-DEMO
// @name Basic
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-switch--basic&viewMode=story
// START-SOURCE
function SwitchBasic() {
  const [checked, setChecked] = useState(null)

  return (
    <Switch
      checked={checked}
      onChange={event => setChecked(event.target.checked)}
    />
  )
}
// END-SOURCE
// END-DEMO

export const Basic = SwitchBasic.bind({}) 

// START-DEMO
// @name Labels
// @url https://storybook.honorable.design/iframe.html?args=&id=demos-switch--labels&viewMode=story
// START-SOURCE
function SwitchLabels() {
  const [checked, setChecked] = useState(null)

  return (
    <Div>
      <Switch
        checked={checked}
        onChange={event => setChecked(event.target.checked)}
      >
        A switch
      </Switch>
      <Switch
        mt={2}
        labelPosition="left"
        checked={checked}
        onChange={event => setChecked(event.target.checked)}
      >
        A switch
      </Switch>
      <Switch
        mt={2}
        labelPosition="top"
        checked={checked}
        onChange={event => setChecked(event.target.checked)}
      >
        A switch
      </Switch>
      <Switch
        mt={2}
        labelPosition="bottom"
        checked={checked}
        onChange={event => setChecked(event.target.checked)}
      >
        A switch
      </Switch>
    </Div>
  )
}
// END-SOURCE
// END-DEMO

export const Labels = SwitchLabels.bind({}) 

// @parts https://storybook.honorable.design/iframe.html?args=&id=demos-switch--parts&viewMode=story
export const Parts = createPartsTemplate(
  (args: any) => (
    <Switch {...args} />
  ),
  'Switch',
  ['Children']
).bind({})
Parts.args = {
  children: 'A Switch',
}
