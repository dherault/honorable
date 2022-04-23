import { Dispatch, KeyboardEvent, MouseEvent, ReactNode, SetStateAction, createContext } from 'react'

export type MenuStateType = {
  value?: any
  renderedItem?: ReactNode
  event?: MouseEvent | KeyboardEvent
  activeItemIndex?: number
  active?: boolean
  isSubMenuVisible?: boolean
  shouldSyncWithParent?: boolean
  shouldFocus?: boolean
}

export type MenuStateDispatcherType = Dispatch<SetStateAction<MenuStateType>>
export type MenuContextType = [MenuStateType, MenuStateDispatcherType, MenuStateType, MenuStateDispatcherType]

export default createContext<MenuContextType>([{}, () => {}, {}, () => {}])
