import { useContext } from 'react'

import { HonorableTheme } from '../types'

import ThemeContext from '../contexts/ThemeContext'

function useTheme(): HonorableTheme {
  return useContext(ThemeContext)
}

export default useTheme
