/* eslint-disable no-multi-spaces */
import { ComponentType, Ref, forwardRef, useState } from 'react'
import styled from '@emotion/styled'

import useTheme from './hooks/useTheme'

import useHonorable from './hooks/useHonorable'

// TODO remove this and replace with hooks
// React HOC to support style props
function withHonorable<P>(ComponentOrTag: ComponentType<any>, name: string) {
  const componentPropsTypes = ComponentOrTag.propTypes || {}
  const propTypeKeys = Object.keys(componentPropsTypes)

  const HonorableStyle = styled(
    ComponentOrTag,
    {
      shouldForwardProp: (prop: string) => !(prop === 'honorable' || prop === 'theme'),
    }
  )<ComponentType<P>>((props: any) => props.honorable)

  function Honorable(props: P, ref: Ref<any>) {
    const theme = useTheme()
    const [overridenProps, setOverridenProps] = useState({})

    const [honorable, otherProps] = useHonorable(name, props as unknown as object, overridenProps, propTypeKeys)

    return (
      <HonorableStyle
        ref={ref}
        theme={theme}
        __honorableOrigin={name}
        __honorableOverridenProps={overridenProps}
        __honorableSetOverridenProps={setOverridenProps}
        honorable={honorable}
        {...otherProps}
      />
    )
  }

  const ForwardedHonorable = forwardRef(Honorable)

  ForwardedHonorable.displayName = `Honorable(${name})`
  ForwardedHonorable.propTypes = componentPropsTypes

  return ForwardedHonorable
}

export default withHonorable
