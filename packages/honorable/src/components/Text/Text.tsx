import { Ref, forwardRef } from 'react'

import { ComponentProps } from '../../types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import filterUndefinedValues from '../../utils/filterUndefinedValues'

import { P } from '../tags'

export const textParts: readonly string[] = [] as const

export const TextPropTypes = {}

export type TextBaseProps = object

export type TextProps = ComponentProps<TextBaseProps, 'p', typeof textParts[number]>

// An alias for P
function TextRef(props: TextProps, ref: Ref<any>) {
  const theme = useTheme()
  const rootStyles = useRootStyles('Text', props, theme)

  return (
    <P
      ref={ref}
      {...rootStyles}
      {...filterUndefinedValues(props)}
    />
  )
}

export const Text = forwardRef(TextRef)

Text.displayName = 'Text'
Text.propTypes = TextPropTypes
