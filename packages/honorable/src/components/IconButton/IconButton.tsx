import { Ref, forwardRef, memo, useEffect, useRef, useState } from 'react'

import { ComponentProps } from '../../types.js'

import useTheme from '../../hooks/useTheme.js'
import useForkedRef from '../../hooks/useForkedRef.js'
import useRootStyles from '../../hooks/useRootStyles.js'

import filterUndefinedValues from '../../utils/filterUndefinedValues.js'

import { ButtonBase } from '../tags.js'

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

const BaseIconButton = forwardRef(IconButtonRef)

BaseIconButton.displayName = 'IconButton'
BaseIconButton.propTypes = iconButtonPropTypes

export const IconButton = memo(BaseIconButton)
