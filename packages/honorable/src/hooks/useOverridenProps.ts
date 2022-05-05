import { Dispatch, SetStateAction, useEffect } from 'react'

type UseOverridenProps = {
  __honorableSetOverridenProps?: Dispatch<SetStateAction<object>>
}

function useOverridenProps({ __honorableSetOverridenProps }: UseOverridenProps, props: object) {
  useEffect(() => {
    __honorableSetOverridenProps(props)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, Object.values(props))
}

export default useOverridenProps
