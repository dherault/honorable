import React from 'react'

import ThemeContext from '../contexts/ThemeContext'

function ThemeProvider({ theme = {}, children }) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
