import { Ref, forwardRef, useEffect, useRef, useState } from 'react'

import { ElementProps } from '../types'

import withHonorable from '../withHonorable'

import useTheme from '../hooks/useTheme'
import useForkedRef from '../hooks/useForkedRef'

import { ButtonBase } from './tags'

type IconButtonProps = ElementProps<'button'>

const propTypes = {}

function IconButton(props: IconButtonProps, ref: Ref<any>) {
  const theme = useTheme()
  const iconButtonRef = useRef<any>()
  const forkedRef = useForkedRef(ref, iconButtonRef)
  const [height, setHeight] = useState<number | 'auto'>('auto')

  useEffect(() => {
    if (iconButtonRef.current) {
      setHeight(iconButtonRef.current.offsetWidth)
    }
  }, [theme])

  return (
    <ButtonBase
      ref={forkedRef}
      height={height}
      xflex="x5"
      display="inline-flex"
      {...props}
    />
  )
}

const ForwardedIconButton = forwardRef(IconButton)

ForwardedIconButton.propTypes = propTypes

export default withHonorable<IconButtonProps>(ForwardedIconButton, 'IconButton')
