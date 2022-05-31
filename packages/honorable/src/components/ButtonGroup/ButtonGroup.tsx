import { Ref, forwardRef } from 'react'

import useTheme from '../../hooks/useTheme'
import useRootStyle from '../../hooks/useRootStyles'

import { Div, DivProps } from '../tags'

export type ButtonGroupBaseProps = {
  /**
   * The direction of the ButtonGroup
   */
  direction: 'row' | 'column'
}

export type ButtonGroupProps = DivProps & ButtonGroupBaseProps

export const buttonGroupPropTypes = {}

function ButtonGroupRef(props: ButtonGroupProps, ref: Ref<any>) {
  const {
    direction = 'row',
    ...otherProps
  } = props
  const theme = useTheme()
  const workingProps = { ...props, direction } // Add default value `row` to direction
  const rootStyle = useRootStyle('ButtonGroup', workingProps, theme)

  return (
    <Div
      ref={ref}
      display="inline-flex"
      flexDirection={direction}
      {...rootStyle}
      {...otherProps}
    />
  )
}

export const ButtonGroup = forwardRef(ButtonGroupRef)

ButtonGroup.displayName = 'ButtonGroup'
ButtonGroup.propTypes = buttonGroupPropTypes
