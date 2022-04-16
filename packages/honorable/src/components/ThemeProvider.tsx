import React from 'react'
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

export default ThemeProvider
