import { Ref, forwardRef } from 'react'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import useTheme from '../hooks/useTheme'
import resolvePartProps from '../utils/resolvePartProps'

import { Div } from './tags'

type ProgressBarProps = ElementProps<'div'> & {
  value: number
}

const propTypes = {}

function ProgressBar(props: ProgressBarProps, ref: Ref<any>) {
  const theme = useTheme()
  const { value, ...otherProps } = props

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
        extend={resolvePartProps('ProgressBar', 'Inner', props, theme)}
      />
    </Div>
  )
}

const ForwardedProgressBar = forwardRef(ProgressBar)

ForwardedProgressBar.propTypes = propTypes

export default withHonorable<ProgressBarProps>(ForwardedProgressBar, 'ProgressBar')
