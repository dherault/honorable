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
    console.log('backdropRef.current', backdropRef.current)
    console.log('event', event)
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
  open: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
}

Modal.defaultProps = {
  open: false,
  onClose: () => {},
  className: '',
}

export default wrapComponentWithStyle(Modal, 'modal')
