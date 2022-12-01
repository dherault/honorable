import React, { ReactElement } from 'react'
import { RenderOptions, render } from '@testing-library/react'
import { matchers } from '@emotion/jest'

import { ThemeProvider } from '../src/components/ThemeProvider/ThemeProvider'

import theme from './themes/theme1'

export * from '@testing-library/react'

expect.extend(matchers)

function WithThemeProvider({ children }: any) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export const themeRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => (
  render(ui, { wrapper: WithThemeProvider, ...options })
)
