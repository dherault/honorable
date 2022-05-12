import { Ref, forwardRef } from 'react'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import { P, PProps } from '../tags'

export type TextBaseProps = unknown

export type TextProps = HonorableProps<PProps & TextBaseProps>

export const TextPropTypes = {}

function TextRef(props: TextProps, ref: Ref<any>) {
  return (
    <P
      ref={ref}
      {...props}
    />
  )
}

TextRef.displayName = 'Text'

const ForwardedText = forwardRef(TextRef)

ForwardedText.propTypes = TextPropTypes

export const Text = withHonorable<TextProps>(ForwardedText, 'Text')
