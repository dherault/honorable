import { HonorableTheme, StyleProps } from '../types'

function resolveAliases(styleProps: StyleProps, theme: HonorableTheme): StyleProps {
  const { aliases } = theme

  if (!(aliases && typeof aliases === 'object')) return styleProps

  return Object.entries(styleProps).reduce((acc, [key, value]) => {
    acc[aliases[key] && typeof aliases[key] === 'string' ? aliases[key] : key] = value

    return acc
  }, {})
}

export default resolveAliases
