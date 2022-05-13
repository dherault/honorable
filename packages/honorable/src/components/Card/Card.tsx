import { Ref, forwardRef } from 'react'

import { HonorableProps } from '../../types'

import withHonorable from '../../withHonorable'

import { Div, DivProps } from '../tags'

export type CardBaseProps = unknown

export type CardProps = HonorableProps<DivProps & CardBaseProps>

export const CardPropTypes = {}

function CardRef(props: CardProps, ref: Ref<any>) {
  return (
    <Div
      ref={ref}
      {...props}
    />
  )
}

CardRef.displayName = 'Card'

const ForwardedCard = forwardRef(CardRef)

ForwardedCard.propTypes = CardPropTypes

export const Card = withHonorable<CardProps>(ForwardedCard, 'Card')
