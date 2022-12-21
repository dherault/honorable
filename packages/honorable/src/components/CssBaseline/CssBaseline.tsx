import { memo } from 'react'
import { Global, css } from '@emotion/react'

import useTheme from '../../hooks/useTheme.js'

import resolveAll from '../../resolvers/resolveAll.js'
import resolveStyles from '../../resolvers/resolveStyles.js'

import normalizeCss from '../../data/normalizeCss.js'

import assignDefaultFontFamily from '../../utils/assignDefaultFontFamily.js'

export type CssBaselineBaseProps = unknown

function BaseCssBaseline() {
  const theme = useTheme()
  const { html, ...otherSelectors } = theme.stylesheet || {}

  return (
    <>
      <Global styles={css`${normalizeCss}`} />
      {Array.isArray(html) && (
        <Global
          styles={{
            html: assignDefaultFontFamily(resolveAll(resolveStyles(html, {}, theme), theme)),
          }}
        />
      )}
      {Object.entries(otherSelectors || {}).map(([selector, styleArray]) => Array.isArray(styleArray) && (
        <Global
          key={selector}
          styles={{
            [selector]: resolveAll(resolveStyles(styleArray, {}, theme), theme) as any,
          }}
        />
      ))}
      <Global
        styles={css`
          :root {
            ${Object.keys(theme.colors || {}).map(colorName => `\t--color-${colorName}: ${theme.utils?.resolveColorString(colorName)};\n`)}
          }
        `}
      />
    </>
  )
}

export const CssBaseline = memo(BaseCssBaseline)
