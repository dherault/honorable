import { Ref, forwardRef } from 'react'

import useTheme from '../../hooks/useTheme'
import useRootStyle from '../../hooks/useRootStyles'

import { Div, DivProps } from '../tags'

export type CardBaseProps = unknown

export type CardProps = DivProps & CardBaseProps

export const CardPropTypes = {}

function CardRef(props: CardProps, ref: Ref<any>) {
  const theme = useTheme()
  const rootStyle = useRootStyle('Card', props, theme)

  return (
    <Div
      ref={ref}
      {...rootStyle}
      {...props}
    />
  )
}

export const Card = forwardRef(CardRef)

Card.displayName = 'Card'
Card.propTypes = CardPropTypes
