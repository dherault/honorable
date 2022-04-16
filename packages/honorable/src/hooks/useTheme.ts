import { useContext } from 'react'

import {
  HonorableTheme,
} from '../types'

import ThemeContext from '../contexts/ThemeContext'
import defaultTheme from '../data/defaultTheme'
import enhanceTheme from '../utils/enhanceTheme'

function useTheme(): HonorableTheme {
  return useContext(ThemeContext) || enhanceTheme(defaultTheme)
}

export default useTheme
