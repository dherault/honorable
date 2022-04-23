import { useEffect } from 'react'

type UseEscapeKeyHandlerType = (event: KeyboardEvent) => void;

function useEscapeKey(handler: UseEscapeKeyHandlerType) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handler(event)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handler])
}

export default useEscapeKey
