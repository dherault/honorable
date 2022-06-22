import { Ref, forwardRef } from 'react'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import { P, PProps } from '../tags'

export type TextBaseProps = unknown

export type TextProps = PProps & TextBaseProps

export const TextPropTypes = {}

// An alias for P
function TextRef(props: TextProps, ref: Ref<any>) {
  const theme = useTheme()
  const rootStyles = useRootStyles('Text', props, theme)

  return (
    <P
      ref={ref}
      {...rootStyles}
      {...props}
    />
  )
}

export const Text = forwardRef(TextRef)

Text.displayName = 'Text'
Text.propTypes = TextPropTypes
