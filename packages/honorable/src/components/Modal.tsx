import { MouseEvent, Ref, forwardRef, useRef } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import useTheme from '../hooks/useTheme'
import useEscapeKey from '../hooks/useEscapeKey'
import resolvePartProps from '../utils/resolvePartProps'
import withHonorable from '../withHonorable'

import { Div } from './tags'

type ModalProps = ElementProps<'div'> & {
  open?: boolean
  onClose?: (event: MouseEvent | KeyboardEvent) => void
}

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

function Modal(props: ModalProps, ref: Ref<any>) {
  const { open = false, onClose, ...otherProps } = props
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
      extend={resolvePartProps('modal', 'backdrop', { open, onClose, ...props }, theme)}
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

const ForwardedModal = forwardRef(Modal)

ForwardedModal.propTypes = propTypes

export default withHonorable<ModalProps>(ForwardedModal, 'modal')
