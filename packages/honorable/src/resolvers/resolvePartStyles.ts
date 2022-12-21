import merge from 'lodash.merge'

import { HonorableTheme } from '../types.js'

import resolveAll from './resolveAll.js'
import resolveStyles from './resolveStyles.js'

// Return the style object of applied part styles
function resolvePartStyles(partKey: string, props: Record<string, any>, theme: HonorableTheme) {
  const originArray = partKey.split('.')
  const name = originArray.shift()
  const key = originArray.join('.')

  // @ts-expect-error
  const partTheme = theme[name]?.[key]

  if (!partTheme) return {}

  const partStyle = resolveStyles(partTheme, props, theme)

  return resolveAll(
    merge(
      {},
      // Component part styles
      partStyle,
      // Global props
      resolveStyles(theme.global, partStyle, theme),
      // Part props
      props[`${key}Props`] || {},
    ),
    theme
  )
}

export default resolvePartStyles
