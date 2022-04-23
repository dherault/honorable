import { ComponentType, Ref, forwardRef } from 'react'

import { HonorableProps } from './types'
import withHonorable from './withHonorable'

function withHonorableRef<P>(ComponentOrTag: ComponentType, name: string) {
  const WithHonorable = withHonorable<P>(ComponentOrTag, name)

  const forwardHonorableRef = (props: HonorableProps<P>, ref: Ref<any>) => (
    <WithHonorable
      {...props}
      honorableRef={ref}
    />
  )

  forwardHonorableRef.displayName = `Honorable(Forwared${WithHonorable.displayName})`

  const ForwardedHonorable = forwardRef<any, HonorableProps<P>>(forwardHonorableRef)

  ForwardedHonorable.displayName = forwardHonorableRef.displayName

  return ForwardedHonorable
}

export default withHonorableRef
