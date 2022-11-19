import { RefObject, useEffect, useState } from 'react'

function useOutsideClick(ref: RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void, preventFirstFire = false) {
  const [firstFire, setFirstFire] = useState(true)

  useEffect(() => {
    console.log('effect')

    function handleClick(event: MouseEvent | TouchEvent) {
      console.log('click', ref.current)

      if (!ref.current && preventFirstFire && !firstFire) {
        console.log('reset')
        setFirstFire(true)

        return
      }

      if (!ref.current || ref.current.contains(event.target as Node)) return

      if (firstFire && preventFirstFire) {
        console.log('prevented')
        setFirstFire(false)

        return
      }

      handler(event)
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('touchstart', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  }, [ref, firstFire, preventFirstFire, handler])
}

export default useOutsideClick
