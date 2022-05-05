import { HonorableTheme, StylesProps } from '../types'

import resolveDefaultProps from '../utils/resolveDefaultProps'

// Return the style object of applied partProps
function resolvePartProps(origin: string, props: object, honorableOverridenProps: object, theme: HonorableTheme): StylesProps {
  const originArray = origin.split('.')
  const originName = originArray.shift()

  const componentTheme = theme[originName]

  if (!(componentTheme && typeof componentTheme === 'object')) return {}

  let partTheme = componentTheme.partProps

  if (!partTheme) return {}

  // TODO v1 include theme from origin
  originArray.forEach(partName => {
    if (!(partTheme && typeof partTheme === 'object')) return

    partTheme = partTheme[partName]
  })

  if (!partTheme) return {}

  return {
    ...resolveDefaultProps(partTheme, { ...props, ...honorableOverridenProps }, theme),
    __honorableOrigin: origin,
  }
}

export default resolvePartProps
