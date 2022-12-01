import { ReactNode, Ref, forwardRef, useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps } from '../../types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import filterUndefinedValues from '../../utils/filterUndefinedValues'

import { Div } from '../tags'

export const treeViewParts = ['Label', 'Children'] as const

export const treeViewPropTypes = {
  expanded: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  label: PropTypes.node,
  onClick: PropTypes.func,
  childrenOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
   * The offset of the children
   */
  childrenOffset?: number | string
}

export type TreeViewProps = ComponentProps<TreeViewBaseProps, 'div', typeof treeViewParts[number]>

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
      width="fit-content"
      {...rootStyles}
      {...filterUndefinedValues(props)}
    >
      <Div
        onClick={handleClick}
        {...resolvePartStyles('TreeView.Label', workingProps, theme)}
      >
        {label}
      </Div>
      <Div
        flexShrink={1}
        paddingLeft={childrenOffset}
        height={actualExpanded ? 'fit-content' : 0}
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
