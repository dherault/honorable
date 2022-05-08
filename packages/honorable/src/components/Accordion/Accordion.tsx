import { ReactNode, Ref, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../../withHonorable'

import useTheme from '../../hooks/useTheme'
import useOverridenProps from '../../hooks/useOverridenProps'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Div, DivProps } from '../tags'
import { Caret } from '../Caret/Caret'

export type AccordionBaseProps = {
  /**
   * Whether the accordion is expanded or not.
   */
  expanded?: boolean
  /**
   * Whether the accordion is expanded by default or not.
   */
  defaultExpanded?: boolean
  onExpand? (expanded: boolean): void
  title?: ReactNode
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

  useOverridenProps(props, { expanded: actualExpanded })

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
      {...otherProps}
    >
      <Div
        xflex="x4"
        cursor="pointer"
        {...resolvePartStyles('Title', props, theme)}
        onClick={handleExpand}
      >
        {title}
        <Div flexGrow={1} />
        <Div
          xflex="x5"
          {...resolvePartStyles('ExpandIcon', props, theme)}
        >
          {expandIcon || <Caret />}
        </Div>
      </Div>
      <Div
        height={actualExpanded ? childrenHeight : 0}
        {...resolvePartStyles('Children', props, theme)}
      >
        <Div
          ref={childrenRef}
          {...resolvePartStyles('ChildrenInner', props, theme)}
        >
          {children}
        </Div>
      </Div>
    </Div>
  )
}

AccordionRef.displayName = 'Accordion'

const ForwardedAccordion = forwardRef(AccordionRef)

ForwardedAccordion.propTypes = accordionPropTypes

export const Accordion = withHonorable<AccordionProps>(ForwardedAccordion, 'Accordion')
