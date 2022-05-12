import { Ref, forwardRef, useEffect, useRef, useState } from 'react'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'

import { ButtonBase, ButtonBaseBaseProps } from '../tags'

export type IconButtonBaseProps = unknown

export type IconButtonProps = HonorableProps<ButtonBaseBaseProps & IconButtonBaseProps>

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
      display="inline-flex"
      alignItem="center"
      justifyContent="center"
      {...props}
    />
  )
}

IconButtonRef.displayName = 'IconButton'

const ForwardedIconButton = forwardRef(IconButtonRef)

ForwardedIconButton.propTypes = iconButtonPropTypes

export const IconButton = withHonorable<IconButtonProps>(ForwardedIconButton, 'IconButton')
