import { Ref, forwardRef } from 'react'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import useTheme from '../../hooks/useTheme'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Div, DivProps } from '../tags'

export type ProgressBarBaseProps = {
  /**
   * The value of the ProgressBar. Between 0 and 1
   */
  value: number
}

export type ProgressBarProps = HonorableProps<DivProps & ProgressBarBaseProps>

export const progressBarPropTypes = {}

function ProgressBarRef(props: ProgressBarProps, ref: Ref<any>) {
  const {
    value,
    ...otherProps
  } = props
  const theme = useTheme()

  return (
    <Div
      ref={ref}
      display="flex"
      justifyContent="flex-start"
      height={8}
      {...otherProps}
    >
      <Div
        backgroundColor="black"
        width={`max(0%, min(100%, calc(${value} * 100%)))`}
        {...resolvePartStyles('Bar', props, theme)}
      />
    </Div>
  )
}

ProgressBarRef.displayName = 'ProgressBar'

const ForwardedProgressBar = forwardRef(ProgressBarRef)

ForwardedProgressBar.propTypes = progressBarPropTypes

export const ProgressBar = withHonorable<ProgressBarProps>(ForwardedProgressBar, 'ProgressBar')
