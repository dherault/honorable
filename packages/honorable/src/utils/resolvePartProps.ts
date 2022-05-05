import { HonorableTheme, StylesProps } from '../types'

import resolveDefaultProps from '../utils/resolveDefaultProps'

function pickHonorableProps(props: object): [any, any] {
  const honorableProps = {}
  const otherProps = {}

  Object.keys(props).forEach(key => {
    if (key.startsWith('__honorable')) honorableProps[key] = props[key]
    else otherProps[key] = props[key]
  })

  return [honorableProps, otherProps]
}

// Return the style object of applied partProps
function resolvePartProps(partKey: string, props: object, theme: HonorableTheme): StylesProps {
  const [{ __honorableOrigin, __honorableOverridenProps }, otherProps] = pickHonorableProps(props)

  const originArray = [...__honorableOrigin.split('.'), partKey]
  const nextHonorableOrigin = originArray.join('.')
  const originName = originArray.shift()

  const componentTheme = theme[originName]

  if (__honorableOrigin.startsWith('DropdownButton')) {
    console.log('nextHonorableOrigin', nextHonorableOrigin)
    console.log('partKey', partKey)
  }

  if (!(componentTheme && typeof componentTheme === 'object')) return { __honorableOrigin: nextHonorableOrigin }

  let partTheme = componentTheme.partProps

  if (!partTheme) return { __honorableOrigin: nextHonorableOrigin }

  // TODO v1 include theme from origin
  originArray.forEach(partName => {
    if (!(partTheme && typeof partTheme === 'object')) return

    partTheme = partTheme[partName]
  })

  if (!partTheme) return { __honorableOrigin: nextHonorableOrigin }

  return {
    ...resolveDefaultProps(partTheme, { ...otherProps, ...__honorableOverridenProps }, theme),
    __honorableOrigin: nextHonorableOrigin,
  }
}

export default resolvePartProps
