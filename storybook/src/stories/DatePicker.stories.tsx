// Icons from https://icons.modulz.app/
import React, { useState } from 'react'
import moment from 'moment'
import { DateTime } from 'luxon'
import { DatePicker, DateTimeProvider, P } from 'honorable'

export default {
  title: 'DatePicker',
  component: DatePicker,
}

function Template(args: any) {
  return (
    <DateTimeProvider moment={moment}>
      <DatePicker {...args} />
    </DateTimeProvider>
  )
}

function Template2(args: any) {
  return (
    <DateTimeProvider luxon={DateTime}>
      <DatePicker {...args} />
    </DateTimeProvider>
  )
}

function Template3(args: any) {
  const [value, setValue] = useState(new Date().toISOString())

  return (
    <DateTimeProvider moment={moment}>
      <P mb={1}>
        {value}
      </P>
      <DatePicker
        {...args}
        value={value}
        onChange={setValue}
      />
    </DateTimeProvider>
  )
}

export const Uncontrolled = Template.bind({})
Uncontrolled.args = {
  monthSpan: 1,
  startDay: 0,
}

export const Luxon = Template2.bind({})
Luxon.args = {
  monthSpan: 1,
  startDay: 0,
}

export const Controlled = Template3.bind({})
Controlled.args = {
  monthSpan: 1,
  startDay: 0,
}

export const MonthSpan = Template.bind({})
MonthSpan.args = {
  monthSpan: 2,
  startDay: 0,
}

export const StartDay = Template.bind({})
StartDay.args = {
  monthSpan: 1,
  startDay: 1,
}

export const StartDate = Template.bind({})
StartDate.args = {
  monthSpan: 1,
  startDay: 1,
  startDate: new Date('2022-01-01').toISOString(),
}
