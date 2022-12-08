import { KeyboardEvent, ReactNode, Ref, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ComponentProps } from '../../types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import filterUndefinedValues from '../../utils/filterUndefinedValues'

import { Caret } from '../Caret/Caret'
import { Div } from '../tags'

export const accordionParts = ['Title', 'ExpandIconWrapper', 'ExpandIcon', 'ChildrenWrapper', 'Children'] as const

export const accordionPropTypes = {
  expanded: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  onExpand: PropTypes.func,
  title: PropTypes.node,
  expandIcon: PropTypes.node,
  invertExpandIcon: PropTypes.bool,
}

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
  /**
   * The Accordion's expand icon node
   */
  invertExpandIcon?: boolean
}

export type AccordionProps = ComponentProps<AccordionBaseProps, 'div', typeof accordionParts[number]>

const expandTransitionDuration = 200

function AccordionRef(props: AccordionProps, ref: Ref<any>) {
  const {
    expanded,
    defaultExpanded,
    title,
    onExpand,
    expandIcon,
    children,
    ...otherProps
  } = props
  const theme = useTheme()
  const childrenRef = useRef<HTMLDivElement>()
  const [childrenHeight, setChildrenHeight] = useState<number | 'auto'>('auto')
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded ?? false)
  const [isExpanding, setIsExpanding] = useState(false)
  const actualExpanded = expanded ?? uncontrolledExpanded
  const workingProps = { ...props, expanded: actualExpanded, isExpanding }
  const rootStyles = useRootStyles('Accordion', workingProps, theme)

  const handleExpand = useCallback(() => {
    setIsExpanding(true)
    setUncontrolledExpanded(!actualExpanded)
    if (typeof onExpand === 'function') onExpand(!actualExpanded)

    setTimeout(() => {
      setIsExpanding(false)
    }, expandTransitionDuration)
  }, [actualExpanded, onExpand])

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleExpand()
    }
  }, [handleExpand])

  useEffect(() => {
    if (!childrenRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      if (!childrenRef.current) return

      setChildrenHeight(childrenRef.current.offsetHeight)
    })

    resizeObserver.observe(childrenRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [children])

  return (
    <Div
      ref={ref}
      {...rootStyles}
      {...filterUndefinedValues(otherProps)}
    >
      <Div
        tabIndex={0}
        display="flex"
        alignItems="stretch"
        justifyContent="space-between"
        cursor="pointer"
        {...resolvePartStyles('Accordion.Title', workingProps, theme)}
        onClick={handleExpand}
        onKeyDown={handleKeyDown}
      >
        {title}
        <Div
          display="flex"
          alignItems="center"
          justifyContent="center"
          {...resolvePartStyles('Accordion.ExpandIconWrapper', workingProps, theme)}
        >
          <Div
            display="flex"
            alignItems="center"
            justifyContent="center"
            {...resolvePartStyles('Accordion.ExpandIcon', workingProps, theme)}
          >
            {expandIcon || <Caret />}
          </Div>
        </Div>
      </Div>
      <Div
        height={actualExpanded ? childrenHeight : 0}
        transition={isExpanding ? `height ${expandTransitionDuration}ms ease` : null}
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
