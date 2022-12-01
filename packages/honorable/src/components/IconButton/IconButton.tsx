import { Ref, forwardRef, useEffect, useRef, useState } from 'react'

import { ComponentProps } from '../../types'

import useTheme from '../../hooks/useTheme'
import useForkedRef from '../../hooks/useForkedRef'
import useRootStyles from '../../hooks/useRootStyles'

import filterUndefinedValues from '../../utils/filterUndefinedValues'

import { ButtonBase } from '../tags'

export const iconButtonParts: readonly string[] = [] as const

export const iconButtonPropTypes = {}

export type IconButtonBaseProps = object

export type IconButtonProps = ComponentProps<IconButtonBaseProps, 'button', typeof iconButtonParts[number]>

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
      alignItems="center"
      justifyContent="center"
      {...rootStyles}
      {...filterUndefinedValues(props)}
    />
  )
}

export const IconButton = forwardRef(IconButtonRef)

IconButton.displayName = 'IconButton'
IconButton.propTypes = iconButtonPropTypes
