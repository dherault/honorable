import { Ref, forwardRef, useEffect, useRef, useState } from 'react'

import withHonorable from '../withHonorable'

import useTheme from '../hooks/useTheme'
import useForkedRef from '../hooks/useForkedRef'

import { ButtonBase, ButtonBaseProps } from './tags'

export type IconButtonProps = ButtonBaseProps

export const iconButtonPropTypes = {}

function IconButtonRef(props: IconButtonProps, ref: Ref<any>) {
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

IconButtonRef.displayName = 'IconButton'

const ForwardedIconButton = forwardRef(IconButtonRef)

ForwardedIconButton.propTypes = iconButtonPropTypes

export const IconButton = withHonorable<IconButtonProps>(ForwardedIconButton, 'IconButton')
