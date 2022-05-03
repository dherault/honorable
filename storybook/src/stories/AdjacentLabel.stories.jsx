import { useState } from 'react'

import { AdjacentLabel, Checkbox, Div } from 'honorable'

export default {
  title: 'AdjacentLabel',
  component: AdjacentLabel,
}

function Template(args) {
  const [checked, setChecked] = useState(false)

  return (
    <Div xflex="x4">
      <AdjacentLabel
        label="A cool adjacent label"
        control={(
          <Checkbox
            checked={checked}
            onChange={event => setChecked(event.target.checked)}
          />
        )}
        {...args}
      />
    </Div>
  )
}

export const Default = Template.bind({})
Default.args = {
  disabled: false,
}
