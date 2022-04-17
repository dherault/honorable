import { PropsWithChildren } from 'react'

import withHonorable from '../withHonorable'

import { Div } from './tags'

function ButtonGroup(props: PropsWithChildren<{}>) {
  return (
    <Div
      display="inline-flex"
      border="1px solid primary"
      borderRadius={4}
      xflex="x4"
      {...props}
    />
  )
}

export default withHonorable(ButtonGroup, 'buttonGroup')
