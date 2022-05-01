import { Dispatch, KeyboardEvent, MouseEvent, ReactNode, SetStateAction, createContext } from 'react'

export type MenuUsageStateType = {
  value?: any
  renderedItem?: ReactNode
  event?: MouseEvent | KeyboardEvent
}

export type MenuUsageStateDispatcherType = Dispatch<SetStateAction<MenuUsageStateType>>
export type MenuUsageContextType = [MenuUsageStateType, MenuUsageStateDispatcherType]

export default createContext<MenuUsageContextType>([{}, () => {}])
