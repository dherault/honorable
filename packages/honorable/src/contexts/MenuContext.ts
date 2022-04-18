import { Dispatch, MouseEvent, ReactNode, SetStateAction, createContext } from 'react'

export type MenuValueType = [any, ReactNode, MouseEvent]
export type MenuContextType = [MenuValueType, Dispatch<SetStateAction<MenuValueType>>]

export default createContext<MenuContextType>([[undefined, undefined, undefined], () => {}])
