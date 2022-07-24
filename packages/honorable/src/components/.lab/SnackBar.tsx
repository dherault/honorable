import { ChangeEvent, KeyboardEvent, MouseEvent, ReactElement, Ref, cloneElement, forwardRef, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'
import useRootStyles from '../../hooks/useRootStyles'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import enhanceEventTarget from '../../utils/enhanceEventTarget'

import { Div, DivProps, Span } from '../tags'

export type SnackBarBaseProps = {
  open?: boolean
  fade?: true
  transitionDuration?: number
  duration?: number
  portal?: boolean
  onClose?: () => void
  position?: 'top-left'
    | 'top-center'
    | 'top-right'
    | 'middle-left'
    | 'middle-center'
    | 'middle-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  offsetVertical?: number | string
  offsetHorizontal?: number | string
}

export type SnackBarProps = DivProps & SnackBarBaseProps

export const snackBarPropTypes = {
  open: PropTypes.bool,
  fade: PropTypes.bool,
  transitionDuration: PropTypes.number,
  duration: PropTypes.number,
  portal: PropTypes.bool,
  onClose: PropTypes.func,
  position: PropTypes.oneOf([
    'top-left',
    'top-center',
    'top-right',
    'middle-left',
    'middle-center',
    'middle-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ]),
  offsetVertical: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  offsetHorizontal: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

function SnackBarRef(props: SnackBarProps, ref: Ref<any>) {
  const {
    open = false,
    fade = true,
    transitionDuration = 333,
    duration = 2000,
    onClose,
    position = 'bottom-left',
    offsetVertical = 32,
    offsetHorizontal = 32,
    children,
    ...otherProps
  } = props
  const theme = useTheme()
  const [rect, setRect] = useState<DOMRect>(null)
  const [isOpen, setIsOpen] = useState(open)
  const workingProps = {
    open,
    fade,
    transitionDuration,
    duration,
    onClose,
    position,
    offsetVertical,
    offsetHorizontal,
    ...otherProps,
  }
  const rootStyles = useRootStyles('SnackBar', workingProps, theme)

  const insetStart: any = {}
  const insetEnd: any = {}

  function wrapFade(element: ReactElement) {
    if (!fade) return element

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
        in={isOpen}
        timeout={transitionDuration}
      >
        {(state: string) => cloneElement(element, {
          ...element.props,
          ...defaultStyle,
          ...transitionStyles[state],
        })}
      </Transition>
    )
  }

  const inset = {}

  // if (position.includes('top'))

  return wrapFade(
    <Div
      ref={ref}
      position="fixed"
      {...rootStyles}
      {...otherProps}
    >
      {children}
    </Div>
  )
}

export const SnackBar = forwardRef(SnackBarRef)

SnackBar.displayName = 'SnackBar'
// @ts-expect-error
SnackBar.propTypes = snackBarPropTypes
