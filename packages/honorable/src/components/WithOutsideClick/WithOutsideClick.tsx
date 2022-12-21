import { Children, PropsWithChildren, ReactElement, cloneElement, memo, useRef } from 'react'

import useOutsideClick from '../../hooks/useOutsideClick.js'

export type WithOutsideClickProps = PropsWithChildren<{
  preventFirstFire?: boolean
  onOutsideClick: (event: MouseEvent | TouchEvent) => void
}>

function BaseWithOutsideClick({ children, onOutsideClick, preventFirstFire = false }: WithOutsideClickProps) {
  const ref = useRef(null)

  useOutsideClick(ref, onOutsideClick, preventFirstFire)

  return cloneElement(Children.only(children as ReactElement), {
    ref,
  })
}

export const WithOutsideClick = memo(BaseWithOutsideClick)
