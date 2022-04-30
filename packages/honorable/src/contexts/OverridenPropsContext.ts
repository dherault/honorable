import { Dispatch, SetStateAction, createContext } from 'react'

export type MenuStateDispatcherType = Dispatch<SetStateAction<object>>
export type MenuContextType = [object, MenuStateDispatcherType]

export default createContext<MenuContextType>([{}, () => {}])
