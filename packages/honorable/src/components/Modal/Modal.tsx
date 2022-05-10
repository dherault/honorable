import { MouseEvent, ReactElement, Ref, cloneElement, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'

import withHonorable from '../../withHonorable'

import useTheme from '../../hooks/useTheme'
import useEscapeKey from '../../hooks/useEscapeKey'

import resolvePartStyles from '../../resolvers/resolvePartStyles'

import { Div, DivProps } from '../tags'

export type ModalBaseProps = {
  open?: boolean
  onClose?: (event: MouseEvent | KeyboardEvent) => void
  fade?: boolean
  transitionDuration?: number
  disableEscapeKey?: boolean
}

export type ModalProps = DivProps & ModalBaseProps

export const modalPropTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  fade: PropTypes.bool,
  transitionDuration: PropTypes.number,
  disableEscapeKey: PropTypes.bool,
}

function ModalRef(props: ModalProps, ref: Ref<any>) {
  const {
    open = false,
    onClose,
    fade = true,
    transitionDuration = 250,
    disableEscapeKey = false,
    ...otherProps
  } = props
  const theme = useTheme()
  const backdropRef = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEscapeKey(event => !disableEscapeKey && handleClose(event))

  const handleClose = useCallback((event: MouseEvent | KeyboardEvent) => {
    if (typeof onClose === 'function') {
      if (fade) {
        setIsClosing(true)
        setTimeout(() => {
          setIsClosing(false)
          onClose(event)
        }, transitionDuration)
      }
      else onClose(event)
    }
  }, [fade, transitionDuration, onClose])

  useEffect(() => {
    if (fade && open) {
      setIsOpen(true)
    }
    else if (fade && !open) {
      setIsOpen(false)
    }
    else {
      setIsOpen(open)
    }
  }, [fade, open, transitionDuration])

  if (!(open || isOpen || isClosing)) return null

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === backdropRef.current) {
      handleClose(event)
    }
  }

  function wrapFadeOutter(element: ReactElement) {
    if (!fade) return element

    const defaultStyle = {
      opacity: 0,
      transition: `opacity ${transitionDuration}ms ease`,
      ...resolvePartStyles('BackdropDefaultStyle', props, theme),
    }

    const transitionStyles = {
      entering: { opacity: 1 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
      ...resolvePartStyles('BackdropTransitionStyle', props, theme),
    }

    return (
      <Transition
        in={isOpen && !isClosing}
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

  function wrapFadeInner(element: ReactElement) {
    if (!fade) return element

    const defaultStyle = {
      opacity: 0,
      transition: `opacity ${transitionDuration}ms ease`,
      ...resolvePartStyles('InnerDefaultStyle', props, theme),
    }

    const transitionStyles = {
      entering: { opacity: 1 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
      ...resolvePartStyles('InnerTransitionStyle', props, theme),
    }

    return (
      <Transition
        in={isOpen && !isClosing}
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

  return wrapFadeOutter(
    <Div
      ref={backdropRef}
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="1000"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      onClick={handleBackdropClick}
      {...resolvePartStyles('Backdrop', props, theme)}
    >
      {wrapFadeInner(
        <Div
          ref={ref}
          backgroundColor="background"
          overflowY="auto"
          m={6}
          {...otherProps}
        />
      )}
    </Div>
  )
}

ModalRef.displayName = 'Modal'

const ForwardedModal = forwardRef(ModalRef)

ForwardedModal.propTypes = modalPropTypes

export const Modal = withHonorable<ModalProps>(ForwardedModal, 'Modal')
