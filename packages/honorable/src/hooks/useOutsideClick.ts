import { RefObject, useEffect } from 'react'

type UseOutsideClickHandlerType = (event: MouseEvent) => void;

function useOutsideClick(ref: RefObject<any>, handler: UseOutsideClickHandlerType) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [ref, handler])
}

export default useOutsideClick
