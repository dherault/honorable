import { Ref, forwardRef, memo } from 'react'

import { ComponentProps } from '../../types.js'

import useTheme from '../../hooks/useTheme.js'
import useRootStyles from '../../hooks/useRootStyles.js'

import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import { Span } from '../tags.js'

export const iconParts: readonly string[] = [] as const

export const iconPropTypes = {}

export type IconBaseProps = object

export type IconProps = ComponentProps<IconBaseProps, 'span', typeof iconParts[number]>

function IconRef(props: IconProps, ref: Ref<any>) {
  const theme = useTheme()
  const rootStyles = useRootStyles('Icon', props, theme)

  return (
    <Span
      ref={ref}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      {...rootStyles}
      {...filterUndefinedValues(props)}
    />
  )
}

const BaseIcon = forwardRef(IconRef)

BaseIcon.displayName = 'Icon'
BaseIcon.propTypes = iconPropTypes

export const Icon = memo(BaseIcon)
