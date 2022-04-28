import { PropsWithChildren, useContext, useMemo, useState } from 'react'
import { ThemeProvider as EmotionProvider } from '@emotion/react'
import PropTypes from 'prop-types'

import { ThemeProps } from '../types'

import ThemeContext from '../contexts/ThemeContext'
import RegisterPropsContext, { RegisterPropsContextType, RegisterPropsType } from '../contexts/RegisterPropsContext'
import defaultTheme from '../data/defaultTheme'
import enhanceTheme from '../utils/enhanceTheme'
import mergeTheme from '../utils/mergeTheme'

export type ThemeProviderProps = PropsWithChildren<ThemeProps>

export const themProviderPropTypes = {
  theme: PropTypes.object,
}

export function ThemeProvider({ theme = {}, children }: ThemeProviderProps) {
  const userTheme = enhanceTheme(mergeTheme(defaultTheme, theme))
  const [registeredProps, setRegisteredProps] = useState<RegisterPropsType>({})
  const registerPropsValue = useMemo<RegisterPropsContextType>(() => [registeredProps, setRegisteredProps], [registeredProps])

  return (
    <ThemeContext.Provider value={userTheme}>
      <RegisterPropsContext.Provider value={registerPropsValue}>
        <EmotionProvider theme={userTheme}>
          {children}
        </EmotionProvider>
      </RegisterPropsContext.Provider>
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
