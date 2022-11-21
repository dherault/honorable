import { ReactNode, Ref, forwardRef, useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Div, DivProps } from '../tags'

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
   * The offset of the children
   */
  childrenOffset?: number | string
}

export type TreeViewProps = Omit<DivProps, 'onClick'> & TreeViewBaseProps

export const treeViewPropTypes = {
  expanded: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  label: PropTypes.node,
  onClick: PropTypes.func,
  childrenOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

function TreeViewRef({ expanded, defaultExpanded = false, label = null, onExpand, childrenOffset = 16, children, ...props }: TreeViewProps, ref: Ref<any>) {
  const theme = useTheme()
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded)
  const actualExpanded = expanded ?? uncontrolledExpanded
  const workingProps = { ...props, defaultExpanded, label, childrenOffset, expanded: actualExpanded }
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
      position="relative"
      width="100%"
      {...rootStyles}
      {...props}
    >
      <Div
        onClick={handleClick}
        {...resolvePartStyles('TreeView.Label', workingProps, theme)}
      >
        {label}
      </Div>
      <Div
        flexShrink={1}
        position="relative"
        left={childrenOffset}
        height={actualExpanded ? 'fit-content' : 0}
        transition="height 250ms ease"
        overflowY="hidden"
        {...resolvePartStyles('TreeView.Children', workingProps, theme)}
      >
        {children}
      </Div>
    </Div>
  )
}

export const TreeView = forwardRef(TreeViewRef)

TreeView.displayName = 'TreeView'
TreeView.propTypes = treeViewPropTypes
