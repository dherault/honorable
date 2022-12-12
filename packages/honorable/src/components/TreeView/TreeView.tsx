import { Children, ReactNode, Ref, forwardRef, useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps } from '../../types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import filterUndefinedValues from '../../utils/filterUndefinedValues'

import { Div } from '../tags'

export const treeViewParts = ['Label', 'Bar', 'Children'] as const

export const treeViewPropTypes = {
  expanded: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  label: PropTypes.node,
  onClick: PropTypes.func,
  childrenOffsetLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  noBar: PropTypes.bool,
  barColor: PropTypes.string,
  barOffsetTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  barOffsetLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export type TreeViewBaseProps = {
  /**
   * The expanded controlled state
   */
  expanded?: boolean
  /**
   * The default state for expanded
   */
  defaultExpanded?: boolean
  /**
   * The label of the TreeView
   */
  label?: ReactNode
  /**
   * The expand callback
   */
  onExpand?: (expanded: boolean) => void
  /**
   * The children offset left
   */
  childrenOffsetLeft?: number | string
  /**
   * Whether to hide the bar or not
   */
  noBar?: boolean
  /**
   * The bar color
   */
  barColor?: string
  /**
   * The bar top offset
   */
  barOffsetTop?: number | string
  /**
   * The bar left offset
   */
  barOffsetLeft?: number | string
}

export type TreeViewProps = ComponentProps<TreeViewBaseProps, 'div', typeof treeViewParts[number]>

function TreeViewRef({
  expanded,
  defaultExpanded = false,
  label = null,
  onExpand,
  childrenOffsetLeft = 0,
  noBar = false,
  barColor = 'text',
  barOffsetTop = 4,
  barOffsetLeft = 16,
  children,
  ...props
}: TreeViewProps, ref: Ref<any>) {
  const theme = useTheme()
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded)
  const actualExpanded = expanded ?? uncontrolledExpanded
  const workingProps = { ...props, defaultExpanded, label, childrenOffsetLeft, noBar, barColor, barOffsetTop, expanded: actualExpanded }
  const rootStyles = useRootStyles('TreeView', workingProps, theme)

  const handleClick = useCallback(() => {
    setUncontrolledExpanded(!actualExpanded)

    if (typeof onExpand === 'function') onExpand(!actualExpanded)
  }, [onExpand, actualExpanded])

  return (
    <Div
      ref={ref}
      display="flex"
      flexDirection="column"
      width="fit-content"
      {...rootStyles}
      {...filterUndefinedValues(props)}
    >
      <Div
        onClick={handleClick}
        cursor="pointer"
        {...resolvePartStyles('TreeView.Label', workingProps, theme)}
      >
        {label}
      </Div>
      {Children.toArray(children).length > 0 && (
        <Div
          display={actualExpanded ? 'flex' : 'none'}
          gap={typeof barOffsetLeft === 'number' ? `${barOffsetLeft}px` : barOffsetLeft}
        >
          <Div
            display={noBar ? 'none' : 'block'}
            width={1}
            backgroundColor={barColor}
            marginTop={barOffsetTop}
            {...resolvePartStyles('TreeView.Bar', workingProps, theme)}
          />
          <Div
            flexShrink={1}
            height={actualExpanded ? 'fit-content' : 0}
            marginLeft={noBar ? barOffsetLeft : 0}
            paddingLeft={childrenOffsetLeft}
            {...resolvePartStyles('TreeView.Children', workingProps, theme)}
          >
            {children}
          </Div>
        </Div>
      )}
    </Div>
  )
}

export const TreeView = forwardRef(TreeViewRef)

TreeView.displayName = 'TreeView'
TreeView.propTypes = treeViewPropTypes
