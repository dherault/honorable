import { Dispatch, MouseEvent, ReactNode, SetStateAction, createContext } from 'react'

export type MenuStateType = {
  value?: any
  renderedItem?: ReactNode
  event?: MouseEvent
  registerItem?: (index: number, value: any) => void
}

export type MenuStateDispatcherType = Dispatch<SetStateAction<MenuStateType>>
export type MenuContextType = [MenuStateType, MenuStateDispatcherType]

export default createContext<MenuContextType>([{}, () => {}])
