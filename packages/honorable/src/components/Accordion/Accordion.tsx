import { ReactNode, Ref, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import resolvePartStyles from '../../resolvers/resolvePartStyles2'

import { Caret } from '../Caret/Caret'
import { Div, DivProps } from '../tags'

export type AccordionBaseProps = {
  /**
   * Whether the Accordion is expanded or not
   */
  expanded?: boolean
  /**
   * Whether the Accordion is expanded by default or not
   */
  defaultExpanded?: boolean
  /**
   * Callback called when the Accordion is expanded or collapsed
   */
  onExpand? (expanded: boolean): void
  /**
   * The Accordion's title node
   */
  title?: ReactNode
  /**
   * The Accordion's expand icon node
   */
  expandIcon?: ReactNode
}

export type AccordionProps = Omit<DivProps, 'title'> & AccordionBaseProps

export const accordionPropTypes = {
  expanded: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  onExpand: PropTypes.func,
  title: PropTypes.node,
  expandIcon: PropTypes.node,
}

function AccordionRef(props: AccordionProps, ref: Ref<any>) {
  const {
    expanded,
    defaultExpanded,
    onExpand,
    expandIcon,
    title,
    children,
    ...otherProps
  } = props
  const theme = useTheme()
  const childrenRef = useRef<HTMLDivElement>()
  const [childrenHeight, setChildrenHeight] = useState<number | 'auto'>('auto')
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded ?? false)
  const actualExpanded = expanded ?? uncontrolledExpanded
  const workingProps = { ...props, expanded: actualExpanded }
  const rootStyles = useRootStyles('Accordion', workingProps, theme)

  const handleExpand = useCallback(() => {
    setUncontrolledExpanded(!actualExpanded)
    if (typeof onExpand === 'function') onExpand(!actualExpanded)
  }, [actualExpanded, onExpand])

  useEffect(() => {
    setChildrenHeight(childrenRef.current.offsetHeight)
  }, [children])

  return (
    <Div
      ref={ref}
      {...rootStyles}
      {...otherProps}
    >
      <Div
        display="flex"
        alignItems="center"
        cursor="pointer"
        {...resolvePartStyles('Accordion.Title', workingProps, theme)}
        onClick={handleExpand}
      >
        {title}
        <Div flexGrow={1} />
        <Div
          display="flex"
          alignItems="center"
          justifyContent="center"
          {...resolvePartStyles('Accordion.ExpandIcon', workingProps, theme)}
        >
          {expandIcon || <Caret />}
        </Div>
      </Div>
      <Div
        height={actualExpanded ? childrenHeight : 0}
        {...resolvePartStyles('Accordion.ChildrenWrapper', workingProps, theme)}
      >
        <Div
          ref={childrenRef}
          {...resolvePartStyles('Accordion.Children', workingProps, theme)}
        >
          {children}
        </Div>
      </Div>
    </Div>
  )
}

export const Accordion = forwardRef(AccordionRef)

Accordion.displayName = 'Accordion'
Accordion.propTypes = accordionPropTypes
