import { Ref, forwardRef } from 'react'
import PropTypes from 'prop-types'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import { Flex, FlexBaseProps, FlexPropTypes, FlexProps } from '../Flex/Flex'
import { Div } from '../tags'

export type GridBaseProps = {
  columns?: number & { [breakpointName: string]: number }
  spacing?: number | string | { [breakpointName: string]: number | string }
  rowSpacing?: number | string | { [breakpointName: string]: number | string }
  columnSpacing?: number | string | { [breakpointName: string]: number | string }
  container?: boolean
  item?: boolean
  zeroMinWidth?: boolean
}

export type GridProps = HonorableProps<FlexProps & GridBaseProps>

export const GridPropTypes = {
  ...FlexPropTypes,
  columns: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  rowSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  columnSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  container: PropTypes.bool,
  item: PropTypes.bool,
  zeroMinWidth: PropTypes.bool,
}

function GridRef(props: GridProps, ref: Ref<any>) {
  const {
    columns,
    spacing,
    rowSpacing,
    columnSpacing,
    container,
    item,
    zeroMinWidth,
    ...otherProps
  } = props

  return (
    <Flex
      ref={ref}
      display="Grid"
      {...otherProps}
      {...props}
    />
  )
}

GridRef.displayName = 'Grid'

const ForwardedGrid = forwardRef(GridRef)

// @ts-ignore
ForwardedGrid.propTypes = GridPropTypes

export const Grid = withHonorable<GridProps>(ForwardedGrid, 'Grid')
