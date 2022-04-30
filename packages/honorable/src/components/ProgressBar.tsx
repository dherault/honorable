import { Ref, forwardRef } from 'react'

import withHonorable from '../withHonorable'

import useTheme from '../hooks/useTheme'

import resolvePartProps from '../utils/resolvePartProps'

import { Div, DivProps } from './tags'

type ProgressBarProps = DivProps & {
  value: number
}

export const progressBarPropTypes = {}

function ProgressBarRef(props: ProgressBarProps, ref: Ref<any>) {
  const {
    honorableOverridenProps,
    value,
    ...otherProps
  } = props
  const theme = useTheme()

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
        {...resolvePartProps('ProgressBar', 'Bar', props, honorableOverridenProps, theme)}
      />
    </Div>
  )
}

ProgressBarRef.displayName = 'ProgressBar'

const ForwardedProgressBar = forwardRef(ProgressBarRef)

ForwardedProgressBar.propTypes = progressBarPropTypes

export const ProgressBar = withHonorable<ProgressBarProps>(ForwardedProgressBar, 'ProgressBar')
