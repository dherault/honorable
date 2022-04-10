import { useContext } from 'react'

import {
  ExtendedTheme,
} from '../types'

import ThemeContext from '../contexts/ThemeContext'
import defaultTheme from '../data/defaultTheme'
import enhanceTheme from '../utils/enhanceTheme'

function useTheme(): ExtendedTheme {
  return (useContext(ThemeContext) as ExtendedTheme) || enhanceTheme(defaultTheme)
}

export default useTheme
