import { Ref, memo, forwardRef } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps } from '../../types'

import withHonorable from '../../withHonorable'

import usePropWithBreakpoints from '../../hooks/usePropWithBreakpoints'

import { Flex, FlexBaseProps, FlexPropTypes, FlexProps } from '../Flex/Flex'
import { Div } from '../tags'

export type GridBaseProps = {
  columns?: number | { [breakpointName: string]: number }
  spacing?: number | string | { [breakpointName: string]: number | string }
  rowSpacing?: number | string | { [breakpointName: string]: number | string }
  columnSpacing?: number | string | { [breakpointName: string]: number | string }
  container?: boolean
  item?: boolean
  zeroMinWidth?: boolean
}

export type GridProps = FlexProps & GridBaseProps & PartProps<typeof GridParts[number]>

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

  const actualColumns = usePropWithBreakpoints(columns)
  // const itemSpan = useBreakpointProps(props)

  return (
    <Flex
      ref={ref}
      display="Grid"
      {...filterUndefinedValues(otherProps)}
      {...filterUndefinedValues(props)}
    />
  )
}

GridRef.displayName = 'Grid'

const ForwardedGrid = memo(forwardRef(GridRef))

// @ts-expect-error
ForwardedGrid.propTypes = GridPropTypes

export const Grid = withHonorable<GridProps>(ForwardedGrid, 'Grid')
