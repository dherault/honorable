import { useEffect, useRef, useState } from 'react'
import { InferProps } from 'prop-types'

import withHonorable from '../withHonorable'

import { Span } from './tags'

function IconButton(props: InferProps<typeof IconButton.propTypes>) {
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
      height={height}
      xflex="x5"
      display="inline-flex"
      cursor="pointer"
      role="button"
      {...props}
    />
  )
}

IconButton.propTypes = Span.propTypes

export default withHonorable(IconButton, 'iconButton')
