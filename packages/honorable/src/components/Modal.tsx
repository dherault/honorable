import { MouseEvent, Ref, forwardRef, useRef } from 'react'
import PropTypes from 'prop-types'

import withHonorable from '../withHonorable'

import useTheme from '../hooks/useTheme'
import useEscapeKey from '../hooks/useEscapeKey'

import resolvePartProps from '../utils/resolvePartProps'

import { Div, DivProps } from './tags'

export type ModalProps = DivProps & {
  open?: boolean
  onClose?: (event: MouseEvent | KeyboardEvent) => void
}

export const modalPropTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

function ModalRef(props: ModalProps, ref: Ref<any>) {
  const {
    __honorableOrigin,
    __honorableOverridenProps,
    open = false,
    onClose,
    ...otherProps
  } = props
  const theme = useTheme()
  const backdropRef = useRef()

  useEscapeKey(onClose)

  if (!open) return null

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === backdropRef.current && typeof onClose === 'function') onClose(event)
  }

  return (
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
      {...resolvePartProps(`${__honorableOrigin}.Backdrop`, props, __honorableOverridenProps, theme)}
    >
      <Div
        ref={ref}
        backgroundColor="background"
        overflowY="auto"
        m={6}
        {...otherProps}
      />
    </Div>
  )
}

ModalRef.displayName = 'Modal'

const ForwardedModal = forwardRef(ModalRef)

ForwardedModal.propTypes = modalPropTypes

export const Modal = withHonorable<ModalProps>(ForwardedModal, 'Modal')
