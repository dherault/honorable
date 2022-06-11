import { Ref, forwardRef } from 'react'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import { Div, DivProps } from '../tags'

export type BoxBaseProps = unknown

export type BoxProps = DivProps & BoxBaseProps

export const BoxPropTypes = {}

function BoxRef(props: BoxProps, ref: Ref<any>) {
  const theme = useTheme()
  const rootStyles = useRootStyles('Box', props, theme)

  return (
    <Div
      ref={ref}
      {...rootStyles}
      {...props}
    />
  )
}

export const Box = forwardRef(BoxRef)

Box.displayName = 'Box'
Box.propTypes = BoxPropTypes
