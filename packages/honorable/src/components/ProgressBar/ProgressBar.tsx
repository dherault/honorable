import { Ref, forwardRef, memo } from 'react'

import { ComponentProps } from '../../types.js'

import useTheme from '../../hooks/useTheme.js'
import useRootStyles from '../../hooks/useRootStyles.js'

import resolvePartStyles from '../../resolvers/resolvePartStyles.js'

import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import { Div } from '../tags.js'

export const progressBarParts = ['Bar'] as const

export const progressBarPropTypes = {}

export type ProgressBarBaseProps = {
  /**
   * The value of the ProgressBar. Between 0 and 1
   */
  value: number
}

export type ProgressBarProps = ComponentProps<ProgressBarBaseProps, 'div', typeof progressBarParts[number]>

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
      {...filterUndefinedValues(otherProps)}
    >
      <Div
        backgroundColor="black"
        width={`max(0%, min(100%, calc(${value} * 100%)))`}
        {...resolvePartStyles('ProgressBar.Bar', props, theme)}
      />
    </Div>
  )
}

const BaseProgressBar = forwardRef(ProgressBarRef)

BaseProgressBar.displayName = 'ProgressBar'
BaseProgressBar.propTypes = progressBarPropTypes

export const ProgressBar = memo(BaseProgressBar)
