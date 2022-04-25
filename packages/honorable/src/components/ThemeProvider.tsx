import { useContext } from 'react'
import { ThemeProvider as EmotionProvider } from '@emotion/react'

import { ThemeProviderProps } from '../types'

import ThemeContext from '../contexts/ThemeContext'
import defaultTheme from '../data/defaultTheme'
import enhanceTheme from '../utils/enhanceTheme'
import mergeTheme from '../utils/mergeTheme'

function ThemeProvider({ theme = {}, children }: ThemeProviderProps) {
  const userTheme = enhanceTheme(mergeTheme(defaultTheme, theme))

  return (
    <ThemeContext.Provider value={userTheme}>
      <EmotionProvider theme={userTheme}>
        {children}
      </EmotionProvider>
    </ThemeContext.Provider>
  )
}

function Extend({ theme = {}, children }: ThemeProviderProps) {
  const existingTheme = useContext(ThemeContext)
  const extendedTheme = enhanceTheme(mergeTheme(existingTheme, theme))

  return (
    <ThemeContext.Provider value={extendedTheme}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.Extend = Extend

export default ThemeProvider
