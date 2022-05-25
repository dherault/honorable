import merge from 'lodash.merge'

import { HonorableTheme, StylesProps } from '../types'

import resolveAll from './resolveAll'
import resolveStyles from './resolveStyles'

function pickHonorableProps(props: object): [any, any] {
  const honorableProps = {}
  const otherProps = {}

  Object.keys(props).forEach(key => {
    if (key.startsWith('__honorable')) honorableProps[key] = props[key]
    else otherProps[key] = props[key]
  })

  return [honorableProps, otherProps]
}

// Return the style object of applied part styles
function resolvePartStyles(partKey: string, props: object, theme: HonorableTheme): StylesProps {
  const [{ __honorableOrigin, __honorableOverridenProps, __honorableOriginProps }, otherProps] = pickHonorableProps(props)

  const originArray = [...__honorableOrigin.split('.'), partKey]
  const nextHonorableProps = {
    __honorableOrigin: originArray.join('.'),
    __honorableOriginProps: otherProps,
  }

  const originName = originArray.shift()

  let partTheme = theme[originName]

  if (!(partTheme && typeof partTheme === 'object')) return nextHonorableProps

  // TODO v1 include theme from origin
  originArray.forEach(partName => {
    if (!(partTheme && typeof partTheme === 'object')) return

    partTheme = partTheme[partName]
  })

  if (!partTheme) return nextHonorableProps

  const honorableProps = { ...(__honorableOriginProps || otherProps), ...__honorableOverridenProps }

  const partStyles = resolveStyles(partTheme, honorableProps, theme)

  return {
    ...resolveAll(
      merge(
        {},
        // Component part styles
        partStyles,
        // Global props
        resolveStyles(theme.global, { ...honorableProps, ...partStyles }, theme),
      ),
      theme
    ),
    ...nextHonorableProps,
  }
}

export default resolvePartStyles
