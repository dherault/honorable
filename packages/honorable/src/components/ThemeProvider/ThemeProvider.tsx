import { PropsWithChildren, useContext } from 'react'
import { ThemeProvider as EmotionProvider } from '@emotion/react'
import PropTypes from 'prop-types'

import { HonorableTheme } from '../../types'

import ThemeContext from '../../contexts/ThemeContext'
import defaultTheme from '../../data/defaultTheme'
import enhanceTheme from '../../utils/enhanceTheme'
import mergeTheme from '../../utils/mergeTheme'

export type ThemeProviderBaseProps = {
  theme: HonorableTheme
}

export type ThemeProviderProps = PropsWithChildren<ThemeProviderBaseProps>

export const themProviderPropTypes = {
  theme: PropTypes.object,
}

export function ThemeProvider({ theme = {}, children }: ThemeProviderProps) {
  const userTheme = enhanceTheme(mergeTheme(defaultTheme, theme))

  return (
    <ThemeContext.Provider value={userTheme}>
      <EmotionProvider theme={userTheme}>
        {children}
      </EmotionProvider>
    </ThemeContext.Provider>
  )
}

export function ExtendTheme({ theme = {}, children }: ThemeProviderProps) {
  const existingTheme = useContext(ThemeContext)
  const extendedTheme = enhanceTheme(mergeTheme(existingTheme, theme))

  return (
    <ThemeContext.Provider value={extendedTheme}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = themProviderPropTypes
ExtendTheme.propTypes = themProviderPropTypes
