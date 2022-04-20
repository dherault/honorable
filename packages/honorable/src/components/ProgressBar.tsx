import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import useTheme from '../hooks/useTheme'
import resolvePartProps from '../utils/resolvePartProps'

import { Div } from './tags'

type ProgressBarProps = ElementProps<'div'> & {
  value: number
}

function ProgressBar(props: ProgressBarProps) {
  const theme = useTheme()
  const { value, ...otherProps } = props

  return (
    <Div
      xflex="x4s"
      height={8}
      {...otherProps}
    >
      <Div
        backgroundColor="black"
        width={`max(0%, min(100%, calc(${value} * 100%)))`}
        extend={resolvePartProps('progressBar', 'inner', props, theme)}
      />
    </Div>
  )
}

export default withHonorable<ProgressBarProps>(ProgressBar, 'progressBar')
