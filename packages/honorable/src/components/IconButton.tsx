import { useEffect, useRef, useState } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import wrapComponentWithStyle from '../utils/wrapComponentWithStyle'

// @ts-ignore
import { Span } from './tags'

function IconButton({ children, className, ...props }: InferProps<typeof IconButton.propTypes>) {
  const rootRef = useRef<any>()
  const [height, setHeight] = useState('auto')

  useEffect(() => {
    if (rootRef.current) {
      setHeight(rootRef.current.clientWidth)
    }
  }, [])

  return (
    <Span
      ref={rootRef}
      className={className}
      xflex="x5"
      display="inline-flex"
      cursor="pointer"
      role="button"
      {...props}
    >
      {children}
    </Span>
  )
}

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

IconButton.defaultProps = {
  className: '',
}

export default wrapComponentWithStyle(IconButton, 'iconButton')
