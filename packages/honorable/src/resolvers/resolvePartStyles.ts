import { HonorableTheme, StylesProps } from '../types'

import resolveDefaultStyles from './resolveDefaultStyles'

function pickHonorableProps(props: object): [any, any] {
  const honorableProps = {}
  const otherProps = {}

  Object.keys(props).forEach(key => {
    if (key.startsWith('__honorable')) honorableProps[key] = props[key]
    else otherProps[key] = props[key]
  })

  return [honorableProps, otherProps]
}

// Return the style object of applied partStyles
function resolvePartStyles(partKey: string, props: object, theme: HonorableTheme): StylesProps {
  const [{ __honorableOrigin, __honorableOverridenProps, __honorableOriginProps }, otherProps] = pickHonorableProps(props)

  const originArray = [...__honorableOrigin.split('.'), partKey]
  const nextHonorableProps = {
    __honorableOrigin: originArray.join('.'),
    __honorableOriginProps: otherProps,
  }

  const originName = originArray.shift()

  const componentTheme = theme[originName]

  if (!(componentTheme && typeof componentTheme === 'object')) return nextHonorableProps

  let partTheme = componentTheme.partStyles

  if (!partTheme) return nextHonorableProps

  // TODO v1 include theme from origin
  originArray.forEach(partName => {
    if (!(partTheme && typeof partTheme === 'object')) return

    partTheme = partTheme[partName]
  })

  if (!partTheme) return nextHonorableProps

  return {
    ...resolveDefaultStyles(partTheme, { ...(__honorableOriginProps || otherProps), ...__honorableOverridenProps }, theme),
    ...nextHonorableProps,
  }
}

export default resolvePartStyles
