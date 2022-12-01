import { Ref, forwardRef } from 'react'

import { ComponentProps } from '../../types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import filterUndefinedValues from '../../utils/filterUndefinedValues'

import { Span } from '../tags'

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

export const Icon = forwardRef(IconRef)

Icon.displayName = 'Icon'
Icon.propTypes = iconPropTypes
