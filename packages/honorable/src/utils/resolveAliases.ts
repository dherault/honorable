import { StyleProps, Theme } from '../types'

function resolveAliases(styleProps: StyleProps, theme: Theme): StyleProps {
  const { aliases } = theme

  if (!(aliases && typeof aliases === 'object')) return styleProps

  return Object.entries(styleProps).reduce((acc, [key, value]) => {
    acc[aliases[key] && typeof aliases[key] === 'string' ? aliases[key] : key] = value

    return acc
  }, {})
}

export default resolveAliases
