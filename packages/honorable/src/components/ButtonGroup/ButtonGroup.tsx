import { Ref, forwardRef, memo } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps } from '../../types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import filterUndefinedValues from '../../utils/filterUndefinedValues'

import { Div } from '../tags'

export const buttonGroupParts: readonly string[] = [] as const

export const buttonGroupPropTypes = {
  direction: PropTypes.oneOf(['row', 'column']),
}

export type ButtonGroupBaseProps = {
  /**
   * The direction of the ButtonGroup
   */
  direction?: 'row' | 'column'
}

export type ButtonGroupProps = ComponentProps<ButtonGroupBaseProps, 'div', typeof buttonGroupParts[number]>

function ButtonGroupRef(props: ButtonGroupProps, ref: Ref<any>) {
  const {
    direction = 'row',
    ...otherProps
  } = props
  const theme = useTheme()
  const workingProps = { ...props, direction } // Add default value `row` to direction
  const rootStyles = useRootStyles('ButtonGroup', workingProps, theme)

  return (
    <Div
      ref={ref}
      display="inline-flex"
      flexDirection={direction}
      {...rootStyles}
      {...filterUndefinedValues(otherProps)}
    />
  )
}

const BaseButtonGroup = forwardRef(ButtonGroupRef)

BaseButtonGroup.displayName = 'ButtonGroup'
BaseButtonGroup.propTypes = buttonGroupPropTypes

export const ButtonGroup = memo(BaseButtonGroup)
