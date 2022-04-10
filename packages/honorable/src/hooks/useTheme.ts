import { useContext } from 'react'

import {
  ExtendedTheme,
  Theme,
} from '../types'

import ThemeContext from '../contexts/ThemeContext'
import defaultTheme from '../data/defaultTheme'
import enhanceTheme from '../utils/enhanceTheme'

function useTheme(): ExtendedTheme {
  return (useContext(ThemeContext) || enhanceTheme(defaultTheme as Theme) as ExtendedTheme)
}

export default useTheme
