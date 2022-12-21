import { Dispatch, MouseEvent, ReactElement, SetStateAction, createContext } from 'react'

export type MenuUsageStateType = {
  value?: any
  renderedItem?: ReactElement[]
  event?: MouseEvent
}

export type MenuUsageStateDispatcherType = Dispatch<SetStateAction<MenuUsageStateType>>

export type MenuUsageContextType = [MenuUsageStateType, MenuUsageStateDispatcherType]

export default createContext<MenuUsageContextType>([{}, () => {}])
