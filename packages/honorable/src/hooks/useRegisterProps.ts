import { useContext, useEffect, useMemo } from 'react'

import RegisterPropsContext from '../contexts/RegisterPropsContext'

function useRegisterProps(name: string, props: object) {
  const [, registerProps] = useContext(RegisterPropsContext)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoedProps = useMemo(() => props, Object.values(props))

  useEffect(() => {
    registerProps(x => ({ ...x, [name]: memoedProps }))
  }, [registerProps, name, memoedProps])
}

export default useRegisterProps
