import { Ref, forwardRef } from 'react'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import { Span, SpanProps } from '../tags'

export type IconBaseProps = unknown

export type IconProps = SpanProps & IconBaseProps

export const iconPropTypes = {}

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
      {...props}
    />
  )
}

const Icon = forwardRef(IconRef)

Icon.displayName = 'Icon'
Icon.propTypes = iconPropTypes
