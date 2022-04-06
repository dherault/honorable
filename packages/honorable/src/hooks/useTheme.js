import { useContext } from 'react'

import ThemeContext from '../contexts/ThemeContext'
import defaultTheme from '../data/defaultTheme'
import enhanceTheme from '../utils/enhanceTheme'

function useTheme() {
  return useContext(ThemeContext) || enhanceTheme(defaultTheme)
}

export default useTheme
