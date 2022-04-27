import { Dispatch, SetStateAction, createContext } from 'react'

export type RegisterPropsType = {
  [name: string]: {
    [id: string]: object
  }
}
export type RegisterPropsDispatcherType = Dispatch<SetStateAction<RegisterPropsType>>
export type RegisterPropsContextType = [RegisterPropsType, RegisterPropsDispatcherType]

export default createContext<RegisterPropsContextType>([{}, () => {}])
