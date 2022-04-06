import { useContext } from 'react'

import ThemeContext from '../contexts/ThemeContext'
import defaultTheme from '../data/defaultTheme'

function useTheme() {
  return useContext(ThemeContext) || defaultTheme
}

export default useTheme
