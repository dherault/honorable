import { Dispatch, SetStateAction, useEffect } from 'react'

type UseOverridenProps = {
  __honorableSetOverridenProps?: Dispatch<SetStateAction<object>>
}

// HACK: any to avoid TS error so far, should use UseOverridenProps
function useOverridenProps({ __honorableSetOverridenProps }: any, props: object) {
  useEffect(() => {
    __honorableSetOverridenProps(props)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, Object.values(props))
}

export default useOverridenProps
