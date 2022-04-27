import { Ref, forwardRef } from 'react'

import withHonorable from '../withHonorable'

import usePartProps from '../hooks/usePartProps'

import { Div, DivProps } from './tags'

type ProgressBarProps = DivProps & {
  value: number
}

const propTypes = {}

function ProgressBarRef(props: ProgressBarProps, ref: Ref<any>) {
  const { value, ...otherProps } = props

  const extendInner = usePartProps('ProgressBar', 'Inner', props)

  return (
    <Div
      ref={ref}
      xflex="x4s"
      height={8}
      {...otherProps}
    >
      <Div
        backgroundColor="black"
        width={`max(0%, min(100%, calc(${value} * 100%)))`}
        extend={extendInner}
      />
    </Div>
  )
}

ProgressBarRef.displayName = 'ProgressBar'

const ForwardedProgressBar = forwardRef(ProgressBarRef)

ForwardedProgressBar.propTypes = propTypes

export const ProgressBar = withHonorable<ProgressBarProps>(ForwardedProgressBar, 'ProgressBar')
