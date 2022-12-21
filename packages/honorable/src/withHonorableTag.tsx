import { ComponentType, Ref, forwardRef } from 'react'
import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'

import { ComponentNames } from './types.js'

import useTheme from './hooks/useTheme.js'
import useHonorable from './hooks/useHonorable.js'

// React HOC to support style props
function withHonorableTag<P>(tag: keyof JSX.IntrinsicElements, name: ComponentNames) {
  // @ts-expect-error
  const HonorableStyle = styled(
    tag,
    {
      shouldForwardProp: isPropValid,
    }
  )<ComponentType<P>>((props: any) => props.honorable)

  function Honorable(props: P, ref: Ref<any>) {
    const theme = useTheme()
    const [honorable, otherProps] = useHonorable(name, props as object, theme)

    return (
      <HonorableStyle
        ref={ref}
        theme={theme}
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
