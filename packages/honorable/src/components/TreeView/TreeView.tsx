import { MouseEvent, ReactNode, Ref, forwardRef, useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'
import useRootStyles from '../../hooks/useRootStyles'

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
}

export type TreeViewProps = Omit<DivProps, 'onClick'> & TreeViewBaseProps

export const treeViewPropTypes = {
  expanded: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  label: PropTypes.node,
  onClick: PropTypes.func,
}

function TreeViewRef({ expanded, defaultExpanded = false, label = null, onClick, onExpand, children, ...props }: TreeViewProps, ref: Ref<any>) {
  const theme = useTheme()
  const rootRef = useRef<HTMLDivElement>(null)
  const forkedRef = useForkedRef(ref, rootRef)
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded)
  const actualExpanded = expanded ?? uncontrolledExpanded
  const rootStyles = useRootStyles('TreeView', { ...props, defaultExpanded, label, expanded: actualExpanded }, theme)

  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (typeof onClick === 'function') onClick(event)

    if (!rootRef.current) return
    if (event.target !== rootRef.current) return

    setUncontrolledExpanded(!actualExpanded)

    if (typeof onExpand === 'function') onExpand(!actualExpanded)
  }, [onClick, onExpand, actualExpanded])

  return (
    <Div
      ref={forkedRef}
      display="flex"
      flexDirection="column"
      position="relative"
      width="100%"
      {...rootStyles}
      {...props}
      onClick={handleClick}
    >
      {label}
      <Div
        flexShrink={1}
        position="relative"
        left={16}
        height={actualExpanded ? 'fit-content' : 0}
        transition="height 250ms ease"
        overflowY="hidden"
      >
        {children}
      </Div>
    </Div>
  )
}

export const TreeView = forwardRef(TreeViewRef)

TreeView.displayName = 'TreeView'
TreeView.propTypes = treeViewPropTypes
