import { RefObject, useEffect } from 'react'

function useOutsideClick(ref: RefObject<any>, handler: (event: MouseEvent) => void) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event)
      }
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('touchstart', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  // Do not add [ref, handler] here as may cause a bug where only the last useOutsideClick works
  // eslint-disable-next-line
  }, [handler])
}

export default useOutsideClick
