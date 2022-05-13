import { Ref, forwardRef } from 'react'
import PropTypes from 'prop-types'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import usePropsWithBreakpoints from '../../hooks/usePropsWithBreakpoints'

import { Flex, FlexBaseProps, FlexPropTypes, FlexProps } from '../Flex/Flex'
import { Div, DivProps } from '../tags'

export type GridBaseProps = {
  columns?: number
  spacing?: number | string
  rowSpacing?: number | string
  columnSpacing?: number | string
  container?: boolean
  item?: boolean
  zeroMinWidth?: boolean
}

export type GridProps = HonorableProps<FlexProps & GridBaseProps>

export const GridPropTypes = {
  // __honorableUseBreakpoints: true,
  ...FlexPropTypes,
  columns: PropTypes.number,
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rowSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  columnSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  } = usePropsWithBreakpoints(props) as GridProps

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

ForwardedGrid.propTypes = GridPropTypes

export const Grid = withHonorable<GridProps>(ForwardedGrid, 'Grid')
