import React, { MouseEvent, useRef } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import useTheme from '../hooks/useTheme'
import resolvePartProps from '../utils/resolvePartProps'
import withHonorable from '../withHonorable'

import { Div } from './tags'

function Modal({
  open = false,
  onClose = (event: MouseEvent) => {},
  ...props
}: InferProps<typeof Modal.propTypes>) {
  const theme = useTheme()
  const backdropRef = useRef()

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
        backgroundColor="background"
        overflowY="auto"
        m={6}
        {...props}
      />
    </Div>
  )
}

Modal.propTypes = {
  ...Div.propTypes,
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

export default withHonorable(Modal, 'modal')
