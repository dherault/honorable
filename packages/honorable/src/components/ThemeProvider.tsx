import React from 'react'
import merge from 'lodash.merge'
import { ThemeProvider as EmotionProvider } from '@emotion/react'

import ThemeContext from '../contexts/ThemeContext'

import defaultTheme from '../data/defaultTheme'
import enhanceTheme from '../utils/enhanceTheme'

import { ThemeProviderProps } from '../types'

function ThemeProvider({ theme = {}, children }: ThemeProviderProps) {
  const userTheme = enhanceTheme(merge({}, defaultTheme, theme))

  return (
    <ThemeContext.Provider value={userTheme}>
      <EmotionProvider theme={userTheme}>
        {children}
      </EmotionProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
