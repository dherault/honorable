import { ReactNode, Ref, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import usePartProps from '../hooks/usePartProps'
import useRegisterProps from '../hooks/useRegisterProps'

import { Div, DivProps } from './tags'
import { Caret } from './Caret'

export type AccordionProps = DivProps & {
  expanded?: boolean
  defaultExpanded?: boolean
  onExpand? (expanded: boolean): void
  title?: ReactNode
  expandIcon?: ReactNode
}

const propTypes = {
  expanded: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  onExpand: PropTypes.func,
  title: PropTypes.node,
  expandIcon: PropTypes.node,
}

const defaultExpandIcon = <Caret />

function AccordionRef(props: AccordionProps, ref: Ref<any>) {
  const {
    honorableId,
    expanded,
    defaultExpanded,
    onExpand,
    expandIcon = defaultExpandIcon,
    title,
    children,
    ...otherProps
  } = props
  const childrenRef = useRef<HTMLDivElement>()
  const [childrenHeight, setChildrenHeight] = useState<number | 'auto'>('auto')
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded ?? false)
  const actualExpanded = expanded ?? uncontrolledExpanded

  useRegisterProps('Accordion', { expanded: actualExpanded }, honorableId)

  const extendTitle = usePartProps('Accordion', 'Title', props)
  const extendExpandIcon = usePartProps('Accordion', 'ExpandIcon', props)
  const extendChildren = usePartProps('Accordion', 'Children', props)
  const extendChildrenInner = usePartProps('Accordion', 'ChildrenInner', props)

  const handleExpand = useCallback(() => {
    setUncontrolledExpanded(!actualExpanded)
    if (typeof onExpand === 'function') onExpand(!actualExpanded)
  }, [actualExpanded, onExpand])

  useEffect(() => {
    setChildrenHeight(childrenRef.current.offsetHeight)
  }, [])

  return (
    <Div
      ref={ref}
      {...otherProps}
    >
      <Div
        xflex="x4"
        cursor="pointer"
        extend={extendTitle}
        onClick={handleExpand}
      >
        {title}
        <Div flexGrow={1} />
        <Div
          xflex="x5"
          extend={extendExpandIcon}
        >
          {expandIcon}
        </Div>
      </Div>
      <Div
        height={actualExpanded ? childrenHeight : 0}
        extend={extendChildren}
      >
        <Div
          ref={childrenRef}
          extend={extendChildrenInner}
        >
          {children}
        </Div>
      </Div>
    </Div>
  )
}

AccordionRef.displayName = 'Accordion'

const ForwardedAccordion = forwardRef(AccordionRef)

// There is a conflict between `title` of DivProps and this component
// @ts-ignore
ForwardedAccordion.propTypes = propTypes

export const Accordion = withHonorable<AccordionProps>(ForwardedAccordion, 'Accordion')
