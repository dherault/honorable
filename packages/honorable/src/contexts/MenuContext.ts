import { Dispatch, MouseEvent, ReactNode, SetStateAction, createContext } from 'react'

export type MenuValueType = [any, ReactNode, MouseEvent]
export type MenuValueDispatcherType = Dispatch<SetStateAction<MenuValueType>>
export type MenuContextType = [MenuValueType, MenuValueDispatcherType]

export default createContext<MenuContextType>([[undefined, undefined, undefined], () => {}])
