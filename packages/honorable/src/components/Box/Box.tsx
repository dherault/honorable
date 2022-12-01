import { Ref, forwardRef } from 'react'

import { ComponentProps } from '../../types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import filterUndefinedValues from '../../utils/filterUndefinedValues'

import { Div } from '../tags'

export const boxParts: readonly string[] = [] as const

export const BoxPropTypes = {}

export type BoxBaseProps = object

export type BoxProps = ComponentProps<BoxBaseProps, 'div', typeof boxParts[number]>

function BoxRef(props: BoxProps, ref: Ref<any>) {
  const theme = useTheme()
  const rootStyles = useRootStyles('Box', props, theme)

  return (
    <Div
      ref={ref}
      {...rootStyles}
      {...filterUndefinedValues(props)}
    />
  )
}

export const Box = forwardRef(BoxRef)

Box.displayName = 'Box'
Box.propTypes = BoxPropTypes
