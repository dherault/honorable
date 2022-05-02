import { useEffect, useState } from 'react'

// TODO
function useImageLoad(src: string) {
  const [loaded, setloaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const img = document.createElement('img')

    img.onload = () => {
      setloaded(true)
    }

    img.onerror = () => {
      setloaded(true)
      setError(true)
    }
  }, [])
}

export default useImageLoad
