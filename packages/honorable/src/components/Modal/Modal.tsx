import { MouseEvent, ReactElement, Ref, cloneElement, forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'

import withHonorable from '../../withHonorable'

import useTheme from '../../hooks/useTheme'
import useEscapeKey from '../../hooks/useEscapeKey'

import resolvePartProps from '../../resolvers/resolvePartProps'

import { Div, DivProps } from '../tags'

export type ModalProps = DivProps & {
  open?: boolean
  onClose?: (event: MouseEvent | KeyboardEvent) => void
  fade?: boolean
  transitionDuration?: number
}

export const modalPropTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  fade: PropTypes.bool,
  transitionDuration: PropTypes.number,
}

function ModalRef(props: ModalProps, ref: Ref<any>) {
  const {
    open = false,
    onClose,
    fade = true,
    transitionDuration = 200,
    ...otherProps
  } = props
  const theme = useTheme()
  const backdropRef = useRef()
  const [actualOpen, setActualOpen] = useState(false)

  useEscapeKey(onClose)

  useEffect(() => {
    if (fade) {
      setTimeout(() => {
        setActualOpen(open)
      }, 0)
    }
    else {
      setActualOpen(open)
    }
  }, [fade, open])

  if (!open) return null

  function handleClose(event: MouseEvent) {
    if (typeof onClose === 'function') onClose(event)
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === backdropRef.current) {
      if (fade) {
        setActualOpen(false)
        setTimeout(() => handleClose(event), transitionDuration)
      }
      else {
        handleClose(event)
      }
    }
  }

  function wrapFadeOutter(element: ReactElement) {
    if (!fade) return element

    const defaultStyle = {
      opacity: 0,
      transition: `opacity ${transitionDuration}ms ease`,
      ...resolvePartProps('BackdropDefaultStyle', props, theme),
    }

    const transitionStyles = {
      entering: { opacity: 1 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
      ...resolvePartProps('BackdropTransitionStyle', props, theme),
    }

    return (
      <Transition
        in={actualOpen}
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
      ...resolvePartProps('InnerDefaultStyle', props, theme),
    }

    const transitionStyles = {
      entering: { opacity: 1 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
      ...resolvePartProps('InnerTransitionStyle', props, theme),
    }

    return (
      <Transition
        in={actualOpen}
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
      xflex="y5"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="1000"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      onClick={handleBackdropClick}
      {...resolvePartProps('Backdrop', props, theme)}
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
