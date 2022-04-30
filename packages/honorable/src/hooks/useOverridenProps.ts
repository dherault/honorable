import { Dispatch, SetStateAction, useEffect } from 'react'

function useOverridenProps(honorableSetOverridenProps: Dispatch<SetStateAction<object>>, props: object) {
  useEffect(() => {
    honorableSetOverridenProps(props)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, Object.values(props))
}

export default useOverridenProps
