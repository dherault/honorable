import { useEffect, useRef } from 'react'

// https://usehooks.com/usePrevious/
function usePrevious<T>(value: T) {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default usePrevious
