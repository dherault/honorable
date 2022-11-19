import { Children, PropsWithChildren, ReactElement, cloneElement, useRef } from 'react'

import useOutsideClick from '../../hooks/useOutsideClick'

export type WithOutsideClickProps = PropsWithChildren<{
  preventFirstFire?: boolean
  onOutsideClick: () => void
}>

export function WithOutsideClick({ children, onOutsideClick, preventFirstFire = false }: WithOutsideClickProps) {
  const ref = useRef(null)

  useOutsideClick(ref, onOutsideClick, preventFirstFire)

  return cloneElement(Children.only(children as ReactElement), {
    ref,
  })
}
