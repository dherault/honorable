// Inspired from https://mui.com/material-ui/api/Tooltip/
import { Children, ReactElement, ReactNode, Ref, SyntheticEvent, cloneElement, forwardRef, useEffect, useRef, useState } from 'react'
import { arrow as arrowMiddleware, offset, shift, useFloating } from '@floating-ui/react-dom'
import PropTypes from 'prop-types'

import withHonorable from '../../withHonorable'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Div, DivProps } from '../tags'

export type TooltipBaseProps = {
  children: ReactNode
  label?: ReactNode
  arrow?: boolean
  arrowSize?: number
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
  label: PropTypes.node,
  arrow: PropTypes.bool,
  arrowSize: PropTypes.number,
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
    label = '',
    arrow = false,
    arrowSize = 8,
    displayOn = ['hover', 'focus', 'click'],
    transitionInDuration = 150,
    transitionOutDuration = 150,
    followCursor = false,
    onOpen,
    open,
    placement = 'top',
    ...otherProps
  } = props
  const theme = useTheme()
  const arrowRef = useRef()
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
  } = useFloating({ placement, middleware })
  const forkedRef = useForkedRef(ref, floating)

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]]

  return (
    <>
      {Children.map(Children.only(children), (child: ReactElement) => cloneElement(child, {
        ...child.props,
        ref: reference,
      }))}
      <Div
        ref={forkedRef}
        position={strategy}
        top={y ?? ''}
        left={x ?? ''}
        backgroundColor="black"
        color="white"
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
            {...resolvePartStyles('Arrow', props, theme)}
          />
        )}
        <Div
          position="relative"
          zIndex={1}
          {...resolvePartStyles('Label', props, theme)}
        >
          {label}
        </Div>
      </Div>
    </>
  )
}

TooltipRef.displayName = 'Tooltip'

const ForwardedTooltip = forwardRef(TooltipRef)

// @ts-expect-error
ForwardedTooltip.propTypes = TooltipPropTypes

export const Tooltip = withHonorable<TooltipProps>(ForwardedTooltip, 'Tooltip')
