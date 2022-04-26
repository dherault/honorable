import { Dispatch, SetStateAction, createContext } from 'react'

import { ComponentNames } from '../types'

export type RegisterPropsType = {
  [name in ComponentNames]?: object
}
export type RegisterPropsDispatcherType = Dispatch<SetStateAction<RegisterPropsType>>
export type RegisterPropsContextType = [RegisterPropsType, RegisterPropsDispatcherType]

export default createContext<RegisterPropsContextType>([{}, () => {}])
