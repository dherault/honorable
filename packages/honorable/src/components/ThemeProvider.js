import React from 'react'
import merge from 'lodash.merge'
import { ThemeProvider as StyledComponentsProvider } from 'styled-components'

import ThemeContext from '../contexts/ThemeContext'

import defaultTheme from '../data/defaultTheme'
import enhanceTheme from '../utils/enhanceTheme'

function ThemeProvider({ theme = {}, children }) {
  const userTheme = enhanceTheme(merge({}, defaultTheme, theme))

  return (
    <ThemeContext.Provider value={userTheme}>
      <StyledComponentsProvider theme={userTheme}>
        {children}
      </StyledComponentsProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
