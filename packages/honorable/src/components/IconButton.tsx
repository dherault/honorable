import { ReactNode, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ElementProps } from '../types'

import useTheme from '../hooks/useTheme'
import withHonorable from '../withHonorable'

import { Button } from './tags'

type IconButtonProps = ElementProps<'button'> & {
  children: ReactNode
}

const propTypes = {
  children: PropTypes.node.isRequired,
}

function IconButton(props: IconButtonProps) {
  const theme = useTheme()
  const rootRef = useRef<any>()
  const [height, setHeight] = useState<number | 'auto'>('auto')

  useEffect(() => {
    if (rootRef.current) {
      setHeight(rootRef.current.offsetWidth)
    }
  }, [theme])

  return (
    <Button
      ref={rootRef}
      height={height}
      xflex="x5"
      display="inline-flex"
      {...props}
    />
  )
}

IconButton.propTypes = propTypes

export default withHonorable<IconButtonProps>(IconButton, 'iconButton')
