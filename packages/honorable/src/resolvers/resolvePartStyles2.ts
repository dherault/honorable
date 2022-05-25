import merge from 'lodash.merge'

import { HonorableTheme, StylesProps } from '../types'

import resolveAll from './resolveAll'
import resolveStyles from './resolveStyles'

// Return the style object of applied part styles
function resolvePartStyles(partKey: string, props: object, theme: HonorableTheme): StylesProps {
  const originArray = partKey.split('.')
  const name = originArray.shift()
  const key = originArray.join('.')

  const partTheme = theme[name]?.[key]

  if (!partTheme) return {}

  const partStyle = resolveStyles(partTheme, props, theme)

  return resolveAll(
    merge(
      {},
      // Component part styles
      partStyle,
      // Global props
      resolveStyles(theme.global, { ...props, ...partStyle }, theme),
    ),
    theme
  )
}

export default resolvePartStyles
