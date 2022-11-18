import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function useOutsideClick(ref: RefObject<HTMLElement>, handler: (event: MouseEvent) => void, preventFirstFire = false) {
  const savedHandler = useRef(handler)
  const savedElement = useRef(ref.current)
  const [firstFire, setFirstFire] = useState(true)

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useIsomorphicLayoutEffect(() => {
    savedElement.current = ref.current
  }, [ref.current])

  useEffect(() => {
    if (!savedElement) return // Somehow this is important, not savedElement.current

    function handleClick(event: MouseEvent) {
      if (!savedElement.current && preventFirstFire && !firstFire) {
        setFirstFire(true)

        return
      }
      if (!savedElement.current || savedElement.current.contains(event.target as Node)) return
      if (firstFire && preventFirstFire) {
        setFirstFire(false)

        return
      }

      savedHandler.current(event)
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('touchstart', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  }, [savedElement, firstFire, preventFirstFire])
}

export default useOutsideClick
