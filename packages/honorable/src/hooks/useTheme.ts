import { useContext } from 'react'

import { HonorableTheme } from '../types.js'

import ThemeContext from '../contexts/ThemeContext.js'

function useTheme(): HonorableTheme {
  return useContext(ThemeContext)
}

export default useTheme
