import { Ref, forwardRef } from 'react'
import PropTypes from 'prop-types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import { Div, DivProps } from '../tags'

export type FlexBaseProps = {
  /**
   * Alias for flexDirection
   */
  direction?: 'row' | 'column'
  /**
   * wrap flex property
   */
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | boolean | string
  /**
   * Alias for flexBasis
   */
  basis?: string | number
  /**
   * Alias for flexGrow
   */
  grow?: boolean | number
  /**
   * Alias for flexShrink
   */
  shrink?: boolean | number
  /**
   * Alias for alignItems
   */
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | string
  /**
   * Alias for justifyContent
   */
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | string
}

export type FlexProps = DivProps & FlexBaseProps

export const FlexPropTypes = {
  direction: PropTypes.oneOf(['row', 'column']),
  wrap: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['wrap', 'nowrap', 'wrap-reverse'])]),
  basis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  grow: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  shrink: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  align: PropTypes.oneOfType([PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']), PropTypes.string]),
  justify: PropTypes.oneOfType([PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']), PropTypes.string]),
}

function FlexRef(props: FlexProps, ref: Ref<any>) {
  const {
    direction,
    wrap,
    basis,
    grow,
    shrink,
    align,
    justify,
    ...otherProps
  } = props
  const theme = useTheme()
  const rootStyle = useRootStyles('Flex', props, theme)

  return (
    <Div
      ref={ref}
      display="flex"
      flexDirection={direction}
      flexWrap={typeof wrap === 'boolean' ? 'wrap' : wrap}
      flexBasis={basis}
      flexGrow={typeof grow === 'boolean' ? 1 : grow}
      flexShrink={typeof shrink === 'boolean' ? 1 : shrink}
      alignItems={align}
      justifyContent={justify}
      {...rootStyle}
      {...otherProps}
    />
  )
}

export const Flex = forwardRef(FlexRef)

Flex.displayName = 'Flex'
Flex.propTypes = FlexPropTypes
