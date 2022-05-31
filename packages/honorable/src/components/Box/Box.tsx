import { Ref, forwardRef } from 'react'

import useTheme from '../../hooks/useTheme'
import useRootStyle from '../../hooks/useRootStyles'

import { Div, DivProps } from '../tags'

export type BoxBaseProps = unknown

export type BoxProps = DivProps & BoxBaseProps

export const BoxPropTypes = {}

function BoxRef(props: BoxProps, ref: Ref<any>) {
  const theme = useTheme()
  const rootStyle = useRootStyle('Box', props, theme)

  return (
    <Div
      ref={ref}
      {...rootStyle}
      {...props}
    />
  )
}

export const Box = forwardRef(BoxRef)

Box.displayName = 'Box'
Box.propTypes = BoxPropTypes
