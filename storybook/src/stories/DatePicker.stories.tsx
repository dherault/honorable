// Icons from https://icons.modulz.app/
import React, { useState } from 'react'
import moment from 'moment'
import { DatePicker, MomentProvider } from 'honorable'

export default {
  title: 'DatePicker',
  component: DatePicker,
}

function Template(args: any) {
  return (
    <MomentProvider moment={moment}>
      <DatePicker {...args} />
    </MomentProvider>
  )
}

function Template2(args: any) {
  const [value, setValue] = useState(new Date().toISOString())

  return (
    <MomentProvider moment={moment}>
      <DatePicker
        {...args}
        value={value}
        onChange={setValue}
      />
    </MomentProvider>
  )
}

export const Uncontrolled = Template.bind({})
Uncontrolled.args = {
}

export const Controlled = Template2.bind({})
Controlled.args = {
}

export const MonthSpan = Template.bind({})
MonthSpan.args = {
  monthSpan: 2,
}
