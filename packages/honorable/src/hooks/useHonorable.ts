import { useMemo } from 'react'
import merge from 'lodash.merge'

import { CssProps } from '../types'

import styleProperties from '../data/stylesProperties'
import propToPseudoSelectors from '../data/propToPseudoSelectors'

import resolveAll from '../resolvers/resolveAll'
import resolveStyles from '../resolvers/resolveStyles'

import isSelector from '../utils/isSelector'
import filterObject from '../utils/filterObject'

import useTheme from './useTheme'

const suffixedstyleProperties = styleProperties.map(x => `${x}-`)
const pseudoSelectorPropKeys = Object.keys(propToPseudoSelectors)

function useHonorable(name: string, props: object, overridenProps: object = {}, propTypeKeys: string[] = []) {
  const theme = useTheme()

  return useMemo(() => {
    const workingProps = { ...props, ...overridenProps }
    const aliases = Object.keys(filterObject(theme.aliases))
    const suffixedAliases = aliases.map(x => `${x}-`)
    const stylesProps: CssProps = {}
    const resolvedRootStyles = resolveStyles(theme[name]?.Root, workingProps, theme)
    const otherProps: Record<string, any> = {}

    Object.entries(props).forEach(([key, value]) => {
      if (
        (
          styleProperties.includes(key as typeof styleProperties[number])
          || suffixedstyleProperties.some(x => key.startsWith(x))
          || aliases.includes(key)
          || suffixedAliases.some(x => key.startsWith(x))
          || isSelector(key)
          || pseudoSelectorPropKeys.includes(key)
        )
        && !propTypeKeys.includes(key)
      ) {
        if (typeof value !== 'undefined') {
          stylesProps[key] = value
        }
      }
      else {
        otherProps[key] = value
      }
    })

    return [
      resolveAll(
        merge(
          {},
          // Component `Root` styles
          resolvedRootStyles,
          // `global` styles
          resolveStyles(theme.global, { ...workingProps, ...resolvedRootStyles }, theme),
          // Actual styles from props
          stylesProps,
          // Resolved styles from props against `global` styles
          resolveStyles(theme.global, stylesProps, theme),
        ),
        theme
      ),
      otherProps,
    ]
  }, [name, props, overridenProps, propTypeKeys, theme])
}

export default useHonorable
