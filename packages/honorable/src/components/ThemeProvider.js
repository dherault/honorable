import React from 'react'
import merge from 'lodash.merge'

import ThemeContext from '../contexts/ThemeContext'

import defaultTheme from '../data/defaultTheme'

function ThemeProvider({ theme = {}, children }) {
  return (
    <ThemeContext.Provider value={merge({}, defaultTheme, theme)}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
