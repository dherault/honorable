// Inspired from https://mui.com/material-ui/api/Tooltip/
import { Children, ReactElement, ReactNode, Ref, cloneElement, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { arrow as arrowMiddleware, autoUpdate, offset, shift, useFloating } from '@floating-ui/react-dom'
import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'
import useOutsideClick from '../../hooks/useOutsideClick'
import useRootStyles from '../../hooks/useRootStyles'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Div, DivProps } from '../tags'

export type TooltipBaseProps = {
  /**
   * The react node that the Tooltip will be displayed on
   * Should be a unique ReactElement able to hold a ref
   */
  children: ReactNode
  /**
   * The react node that will be displayed in the Tooltip
   */
  label?: ReactNode
  /**
   * Weither the Tooltip should display an arrow or not
   */
  arrow?: boolean
  /**
   * If `arrow`, the  size of the arrow
   */
  arrowSize?: number
  /**
   * The states the Tooltip should be displayed with
   */
  displayOn?: ('hover' | 'focus' | 'click')[]
  /**
   * The transition duration of the Tooltip's fade
   */
  transitionDuration?: number
  /**
   * The enter delay of the Tooltip
   */
  enterDelay?: number
  /**
   * The leave delay of the Tooltip
   */
  leaveDelay?: number
  /**
   * Weither the Tooltip should follow the cursor or not
   */
  followCursor?: boolean
  /**
   * Callback function called when the Tooltip is opened or closed
   */
  onOpen?: (event: MouseEvent | FocusEvent, open: boolean) => void
  /**
   * Weither the Tooltip is open or not
   */
  open?: boolean
  /**
   * The placement of the Tooltip relative to its child
   */
  placement?: 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top'
}

export type TooltipProps = DivProps & TooltipBaseProps

export const TooltipPropTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.node,
  arrow: PropTypes.bool,
  arrowSize: PropTypes.number,
  displayOn: PropTypes.arrayOf(PropTypes.oneOf(['hover', 'focus', 'click'])),
  transitionDuration: PropTypes.number,
  enterDelay: PropTypes.number,
  leaveDelay: PropTypes.number,
  followCursor: PropTypes.bool,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  placement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
}

// TODO v1 loading
function TooltipRef(props: TooltipProps, ref: Ref<any>) {
  const {
    children,
    label = '',
    arrow = false,
    arrowSize = 8,
    displayOn = ['hover', 'focus', 'click'],
    transitionDuration = 150,
    enterDelay,
    leaveDelay,
    // followCursor = false,
    onOpen,
    open,
    placement = 'top',
    ...otherProps
  } = props
  const theme = useTheme()
  const rootStyles = useRootStyles('Tooltip', props, theme)

  const arrowRef = useRef()
  const childRef = useRef<HTMLElement>()
  const middleware = [offset(8), shift({ padding: 8 })]

  if (arrow) {
    middleware.push(arrowMiddleware({ element: arrowRef, padding: 8 }))
  }

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    middlewareData: {
      arrow: {
        x: arrowX,
        y: arrowY,
      } = {},
    },
  } = useFloating({
    placement,
    middleware,
    whileElementsMounted: autoUpdate,
  })
  const forkedChildRef = useForkedRef(childRef, reference)
  const forkedTooltipRef = useForkedRef(ref, floating)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const actualOpen = open ?? uncontrolledOpen

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]]

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (!uncontrolledOpen || !displayOn.includes('click')) return

    setTimeout(() => {
      setUncontrolledOpen(false)
      if (typeof onOpen === 'function') onOpen(event, false)
    }, leaveDelay)
  }, [displayOn, uncontrolledOpen, leaveDelay, onOpen])

  const handleClick = useCallback((event: MouseEvent) => {
    if (uncontrolledOpen || !displayOn.includes('click')) return

    setTimeout(() => {
      setUncontrolledOpen(true)
      if (typeof onOpen === 'function') onOpen(event, true)
    }, enterDelay)
  }, [displayOn, uncontrolledOpen, enterDelay, onOpen])

  const handleMouseEnter = useCallback((event: MouseEvent) => {
    if (uncontrolledOpen || !displayOn.includes('hover')) return

    setTimeout(() => {
      setUncontrolledOpen(true)
      if (typeof onOpen === 'function') onOpen(event, true)
    }, enterDelay)
  }, [displayOn, uncontrolledOpen, enterDelay, onOpen])

  const handleMouseLeave = useCallback((event: MouseEvent) => {
    if (!uncontrolledOpen || !displayOn.includes('hover')) return

    setTimeout(() => {
      setUncontrolledOpen(false)
      if (typeof onOpen === 'function') onOpen(event, false)
    }, leaveDelay)
  }, [displayOn, uncontrolledOpen, leaveDelay, onOpen])

  const handleFocus = useCallback((event: FocusEvent) => {
    if (uncontrolledOpen || !displayOn.includes('click')) return

    setTimeout(() => {
      setUncontrolledOpen(true)
      if (typeof onOpen === 'function') onOpen(event, true)
    }, enterDelay)
  }, [displayOn, uncontrolledOpen, enterDelay, onOpen])

  const handleBlur = useCallback((event: FocusEvent) => {
    if (!uncontrolledOpen || !displayOn.includes('click')) return

    setTimeout(() => {
      setUncontrolledOpen(false)
      if (typeof onOpen === 'function') onOpen(event, false)
    }, leaveDelay)
  }, [displayOn, uncontrolledOpen, leaveDelay, onOpen])

  useOutsideClick(childRef, handleOutsideClick)

  useEffect(() => {
    if (!childRef.current) return

    const { current } = childRef

    current.addEventListener('click', handleClick)
    current.addEventListener('mouseenter', handleMouseEnter)
    current.addEventListener('mouseleave', handleMouseLeave)
    current.addEventListener('focus', handleFocus)
    current.addEventListener('blur', handleBlur)

    return () => {
      current.removeEventListener('click', handleClick)
      current.removeEventListener('mouseenter', handleMouseEnter)
      current.removeEventListener('mouseleave', handleMouseLeave)
      current.removeEventListener('focus', handleFocus)
      current.removeEventListener('blur', handleBlur)
    }
  }, [handleMouseEnter, handleMouseLeave, handleClick, handleFocus, handleBlur])

  function wrapFade(element: ReactElement) {
    const positionStyles = {
      position: strategy,
      top: y ?? '',
      left: x ?? '',
    }

    const defaultStyle = {
      opacity: 0,
      transition: `opacity ${transitionDuration}ms ease`,
    }

    const transitionStyles = {
      entering: { opacity: 1 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
    }

    return (
      <Transition
        in={actualOpen}
        appear
        timeout={transitionDuration}
      >
        {(state: string) => cloneElement(element, {
          ...element.props,
          ...positionStyles,
          ...defaultStyle,
          ...transitionStyles[state],
        })}
      </Transition>
    )
  }

  return (
    <>
      {Children.map(Children.only(children), (child: ReactElement) => cloneElement(child, {
        ...child.props,
        ref: forkedChildRef,
      }))}
      {wrapFade(
        <Div
          ref={forkedTooltipRef}
          backgroundColor="black"
          color="white"
          {...rootStyles}
          {...otherProps}
        >
          {!!arrow && (
            <Div
              ref={arrowRef}
              position="absolute"
              background="black"
              width={arrowSize}
              height={arrowSize}
              top={arrowY ?? ''}
              left={arrowX ?? ''}
              transform="rotate(45deg)"
              zIndex={0}
              {...{ [staticSide]: -arrowSize / 2 }}
              {...resolvePartStyles('Tooltip.Arrow', props, theme)}
            />
          )}
          <Div
            position="relative"
            zIndex={1}
            {...resolvePartStyles('Tooltip.Label', props, theme)}
          >
            {label}
          </Div>
        </Div>
      )}
    </>
  )
}

export const Tooltip = forwardRef(TooltipRef)

Tooltip.displayName = 'Tooltip'
// @ts-expect-error
Tooltip.propTypes = TooltipPropTypes
