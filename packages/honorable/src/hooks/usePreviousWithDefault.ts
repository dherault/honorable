import { useEffect, useRef } from 'react'

// https://usehooks.com/usePrevious/
function usePreviousWithDefault(value: any) {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default usePreviousWithDefault
