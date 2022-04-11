import React, { MouseEvent, useRef } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import useTheme from '../hooks/useTheme'
import resolvePartProps from '../utils/resolvePartProps'
import wrapComponentWithStyle from '../utils/wrapComponentWithStyle'

// @ts-ignore
import { Div } from './tags'

function Modal({ children, open = false, onClose = () => {}, className = '', ...props }: InferProps<typeof Modal.propTypes>) {
  const theme = useTheme()
  const backdropRef = useRef()

  if (!open) return null

  const extendProps = { children, open, onClose, ...props }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === backdropRef.current && typeof onClose === 'function') onClose()
  }

  return (
    <Div
      ref={backdropRef}
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="1000"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      onClick={handleBackdropClick}
      xflex="x5"
      extend={resolvePartProps('modal', 'backdrop', extendProps, theme)}
    >
      <Div
        className={className}
        backgroundColor="background"
        {...props}
      >
        {children}
      </Div>
    </Div>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

Modal.defaultProps = {
  open: false,
  onClose: () => {},
}

export default wrapComponentWithStyle(Modal, 'modal')
