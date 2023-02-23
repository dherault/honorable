import { createContext } from 'react'

type ThemeModeType = 'light' | 'dark'
type ThemeModeContextType = [ThemeModeType, (themeMode: ThemeModeType) => void]

export default createContext<ThemeModeContextType>(['light', () => {}])
