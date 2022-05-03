import { useLayoutEffect, useState } from 'react'

// TODO
function useImageLoad(src: string): [boolean, boolean] {
  const [loaded, setloaded] = useState(false)
  const [error, setError] = useState(false)

  useLayoutEffect(() => {
    if (!src) return

    const img = document.createElement('img')

    img.onload = () => {
      setloaded(true)
    }

    img.onerror = () => {
      setloaded(true)
      setError(true)
    }

    img.src = src
  }, [src])

  return [loaded, error]
}

export default useImageLoad
