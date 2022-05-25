import { ComponentType, Ref, forwardRef } from 'react'
import styled from '@emotion/styled'

import useTheme from './hooks/useTheme'
import useHonorable from './hooks/useHonorable'

// React HOC to support style props
function withHonorableTag<P>(tag: string, name: string) {
  const HonorableStyle = styled(
    // @ts-expect-error
    tag,
    {
      shouldForwardProp: (prop: string) => !(prop.startsWith('__honorable') || prop === 'honorable' || prop === 'theme'),
    }
  )<ComponentType<P>>((props: any) => props.honorable)

  function Honorable(props: P, ref: Ref<any>) {
    const theme = useTheme()
    const [honorable, otherProps] = useHonorable(name, props as unknown as object)

    if (name === 'P') {
      console.log('otherProps', otherProps)
    }

    return (
      <HonorableStyle
        ref={ref}
        theme={theme}
        // @ts-expect-error
        honorable={honorable}
        {...otherProps}
      />
    )
  }

  const ForwardedHonorable = forwardRef(Honorable)

  ForwardedHonorable.displayName = `Honorable(${name})`

  return ForwardedHonorable
}

export default withHonorableTag
