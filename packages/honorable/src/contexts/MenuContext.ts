import { Dispatch, SetStateAction, createContext } from 'react'

export type MenuStateType = {
  activeItemIndex?: number
  defaultActiveItemIndex?: number
  active?: boolean
  isSubMenuVisible?: boolean
  shouldFocus?: boolean
  shouldSyncWithParent?: boolean
  locked?: boolean
}

export type MenuStateDispatcherType = Dispatch<SetStateAction<MenuStateType>>
export type MenuContextType = [MenuStateType, MenuStateDispatcherType, MenuStateType, MenuStateDispatcherType]

export default createContext<MenuContextType>([{}, () => {}, {}, () => {}])
