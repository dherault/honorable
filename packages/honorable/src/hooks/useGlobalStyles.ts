import { css } from '@emotion/react'

import { useMemo } from 'react'

import resolveAll from '../resolvers/resolveAll.js'

import resolveStyles from '../resolvers/resolveStyles.js'

import normalizeCss from '../data/normalizeCss.js'

import assignDefaultFontFamily from '../utils/assignDefaultFontFamily.js'

import useTheme from './useTheme.js'

// A hook to return the global styles
// Useful when working with iframes
function useGlobalStyles() {
  const theme = useTheme()
  const { html, ...otherSelectors } = theme.stylesheet || {}

  return useMemo(() => {
    const normalizeCssCss = css`${normalizeCss}`
    const rootCss = css`
      :root {
        ${Object.keys(theme.colors || {}).map(colorName => `\t--color-${colorName}: ${theme.utils!.resolveColorString(colorName)};\n`)}
      }
    `

    const globalStyles: Record<string, any> = {
      html: assignDefaultFontFamily(resolveAll(resolveStyles(html, {}, theme), theme)),
    }

    Object.entries(otherSelectors || {}).forEach(([selector, styleArray]) => {
      if (!Array.isArray(styleArray)) return

      globalStyles[selector] = resolveAll(resolveStyles(styleArray, {}, theme), theme) as any
    })

    return [
      normalizeCssCss,
      rootCss,
      css(globalStyles),
    ]
  }, [theme, html, otherSelectors])
}

export default useGlobalStyles
