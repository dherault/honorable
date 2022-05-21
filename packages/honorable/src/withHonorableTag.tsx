import { Ref, forwardRef } from 'react'
import styled from '@emotion/styled'
// import merge from 'lodash.merge'

import { StyledHonorableProps } from './types'

import useTheme from './hooks/useTheme'
import useHonorable from './hooks/useHonorable'
// import usePreviousWithDefault from './hooks/usePreviousWithDefault'

// function useDiff(props: object) {
//   const previousProps = usePreviousWithDefault(props)

//   const oldProps = {}
//   const newProps = {}

//   Object.keys(props).forEach(key => {
//     if (props[key] !== previousProps[key]) {
//       newProps[key] = props[key]
//     }
//     else {
//       oldProps[key] = props[key]
//     }
//   })

//   return [oldProps, newProps]
// }

// React HOC to support style props
function withHonorableTag<P>(tag: string, name: string) {
  // @ts-expect-error
  const HonorableStyle = styled(tag)<StyledHonorableProps>(props => props.honorable)

  function Honorable(props: P, ref: Ref<any>) {
    const theme = useTheme()
    // const [oldProps, newProps] = useDiff(props as unknown as object)

    // console.log('newProps', newProps)
    // const [oldHonorable, oldOtherProps] = useHonorable(oldProps, name, 1)
    // const [newHonorable, newOtherProps] = useHonorable(newProps, name, 2)

    const [honorable, otherProps] = useHonorable(props as unknown as object, name)

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
