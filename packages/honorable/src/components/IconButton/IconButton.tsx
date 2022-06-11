import { Ref, forwardRef, useEffect, useRef, useState } from 'react'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'
import useRootStyles from '../../hooks/useRootStyles'

import { ButtonBase, ButtonBaseBaseProps } from '../tags'

export type IconButtonBaseProps = unknown

export type IconButtonProps = ButtonBaseBaseProps & IconButtonBaseProps

export const iconButtonPropTypes = {}

function IconButtonRef(props: IconButtonProps, ref: Ref<any>) {
  const theme = useTheme()
  const iconButtonRef = useRef<any>()
  const forkedRef = useForkedRef(ref, iconButtonRef)
  const [height, setHeight] = useState<number | 'auto'>('auto')
  const rootStyles = useRootStyles('IconButton', props, theme)

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
      {...rootStyles}
      {...props}
    />
  )
}

const IconButton = forwardRef(IconButtonRef)

IconButton.displayName = 'IconButton'
IconButton.propTypes = iconButtonPropTypes
