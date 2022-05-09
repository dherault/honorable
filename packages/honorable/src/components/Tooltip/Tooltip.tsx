// Inspired from https://mui.com/material-ui/api/Tooltip/
import { Children, ReactElement, ReactNode, Ref, SyntheticEvent, cloneElement, forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../../withHonorable'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Div, DivProps } from '../tags'

export type TooltipBaseProps = {
  children: ReactNode
  title?: ReactNode
  arrow?: boolean
  displayOn?: ('hover' | 'focus' | 'click')[]
  transitionInDuration?: number
  transitionOutDuration?: number
  followCursor?: boolean
  onOpen?: (event: SyntheticEvent, open: boolean) => void
  open?: boolean
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
  title: PropTypes.node,
  arrow: PropTypes.bool,
  displayOn: PropTypes.arrayOf(PropTypes.oneOf(['hover', 'focus', 'click'])),
  transitionInDuration: PropTypes.number,
  transitionOutDuration: PropTypes.number,
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
    title,
    arrow,
    displayOn,
    transitionInDuration,
    transitionOutDuration,
    followCursor,
    onOpen,
    open,
    placement,
    ...otherProps
  } = props
  const theme = useTheme()
  const childRef = useRef()

  const child = Children.only(children) as ReactElement

  return (
    <>
      {cloneElement(child, {
        ...child.props,
        ref: childRef,
      })}
    </>
  )
}

TooltipRef.displayName = 'Tooltip'

const ForwardedTooltip = forwardRef(TooltipRef)

// @ts-expect-error
ForwardedTooltip.propTypes = TooltipPropTypes

export const Tooltip = withHonorable<TooltipProps>(ForwardedTooltip, 'Tooltip')
