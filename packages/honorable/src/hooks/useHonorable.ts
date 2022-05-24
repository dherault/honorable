import { useMemo } from 'react'
import merge from 'lodash.merge'

import { StylesProps } from '../types'

import mpProperties from '../data/mpProperties'
import styleProperties from '../data/stylesProperties'
import propToPseudoSelectors from '../data/propToPseudoSelectors'

import useTheme from '../hooks/useTheme'

import resolveAll from '../resolvers/resolveAll'
import resolveStyles from '../resolvers/resolveStyles'

import isSelector from '../utils/isSelector'
import filterObject from '../utils/filterObject'

const allStyleProperties = [
  ...mpProperties,
  ...styleProperties,
]
const suffixedAllStyleProperties = allStyleProperties.map(x => `${x}-`)
const pseudoSelectorPropKeys = Object.keys(propToPseudoSelectors)

function useHonorable(props: object, name: string, propTypeKeys: string[] = []) {
  const theme = useTheme()

  return useMemo(() => {
    const aliases = Object.keys(filterObject(theme.aliases))
    const suffixedAliases = aliases.map(x => `${x}-`)
    const stylesProps: StylesProps = {}
    const resolvedRootStyles = resolveStyles(theme[name]?.Root, props, theme)
    const otherProps = resolveStyles(theme[name]?.DefaultProps, props, theme)

    Object.entries(props).forEach(([key, value]) => {
      if (
        (
          allStyleProperties.includes(key as typeof allStyleProperties[number])
          || suffixedAllStyleProperties.some(x => key.startsWith(x))
          || aliases.includes(key)
          || suffixedAliases.some(x => key.startsWith(x))
          || isSelector(key)
          || pseudoSelectorPropKeys.includes(key)
        )
        && !propTypeKeys.includes(key)
      ) {
        stylesProps[key] = value
      }
      else {
        otherProps[key] = value
      }
    })

    return [
      resolveAll(
        merge(
          {},
          // Component root styles
          resolvedRootStyles,
          // Global props
          resolveStyles(theme.global, { ...props, ...resolvedRootStyles }, theme),
          // Actual style from props
          stylesProps,
        ),
        theme
      ),
      otherProps,
    ]
  }, [props, name, propTypeKeys, theme])
}

export default useHonorable
