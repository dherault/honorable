import { Ref, forwardRef } from 'react'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import resolvePartStyles from '../../resolvers/resolvePartStyles2'

import { Div, DivProps } from '../tags'

export type ProgressBarBaseProps = {
  /**
   * The value of the ProgressBar. Between 0 and 1
   */
  value: number
}

export type ProgressBarProps = DivProps & ProgressBarBaseProps

export const progressBarPropTypes = {}

function ProgressBarRef(props: ProgressBarProps, ref: Ref<any>) {
  const {
    value,
    ...otherProps
  } = props
  const theme = useTheme()
  const rootStyles = useRootStyles('ProgressBar', props, theme)

  return (
    <Div
      ref={ref}
      display="flex"
      justifyContent="flex-start"
      height={8}
      {...rootStyles}
      {...otherProps}
    >
      <Div
        backgroundColor="black"
        width={`max(0%, min(100%, calc(${value} * 100%)))`}
        {...resolvePartStyles('ProgressBar.Bar', props, theme)}
      />
    </Div>
  )
}

export const ProgressBar = forwardRef(ProgressBarRef)

ProgressBar.displayName = 'ProgressBar'
ProgressBar.propTypes = progressBarPropTypes
