import { Ref, forwardRef } from 'react'

import { ComponentProps } from '../../types'

import useTheme from '../../hooks/useTheme'
import useRootStyles from '../../hooks/useRootStyles'

import filterUndefinedValues from '../../utils/filterUndefinedValues'

import { Div } from '../tags'

export const cardParts: readonly string[] = [] as const

export const CardPropTypes = {}

export type CardBaseProps = object

export type CardProps = ComponentProps<CardBaseProps, 'div', typeof cardParts[number]>

function CardRef(props: CardProps, ref: Ref<any>) {
  const theme = useTheme()
  const rootStyles = useRootStyles('Card', props, theme)

  return (
    <Div
      ref={ref}
      {...rootStyles}
      {...filterUndefinedValues(props)}
    />
  )
}

export const Card = forwardRef(CardRef)

Card.displayName = 'Card'
Card.propTypes = CardPropTypes
