import { useContext } from 'react'

import ThemeContext from '../contexts/ThemeContext'

function useTheme() {
  return useContext(ThemeContext)
}

export default useTheme
