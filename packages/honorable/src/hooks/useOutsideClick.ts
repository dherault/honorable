import { RefObject, useEffect } from 'react'

function useOutsideClick(ref: RefObject<any>, handler: () => void) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler()
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [ref, handler])
}

export default useOutsideClick
