import { MouseEvent, Ref, forwardRef, useRef } from 'react'
import PropTypes from 'prop-types'

import usePartProps from '../hooks/usePartProps'
import useEscapeKey from '../hooks/useEscapeKey'
import withHonorable from '../withHonorable'

import { Div, DivProps } from './tags'

export type ModalProps = DivProps & {
  open?: boolean
  onClose?: (event: MouseEvent | KeyboardEvent) => void
}

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

function ModalRef(props: ModalProps, ref: Ref<any>) {
  const { open = false, onClose, ...otherProps } = props
  const backdropRef = useRef()

  useEscapeKey(onClose)

  const extendBackdrop = usePartProps('Modal', 'Backdrop', props)

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
      extend={extendBackdrop}
      onClick={handleBackdropClick}
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

ForwardedModal.propTypes = propTypes

export const Modal = withHonorable<ModalProps>(ForwardedModal, 'Modal')
