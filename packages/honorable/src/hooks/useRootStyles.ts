import { useMemo } from 'react'
import merge from 'lodash.merge'

import { HonorableTheme, StylesProps } from '../types'

import resolveAll from '../resolvers/resolveAll'
import resolveStyles from '../resolvers/resolveStyles'

function useRootStyles(name: string, props: object, theme: HonorableTheme): StylesProps {
  return useMemo<StylesProps>(() => {
    const resolvedRootStyles = resolveStyles(theme[name]?.Root, props, theme)

    return resolveAll(
      merge(
        {},
        // Component root styles
        resolvedRootStyles,
        // Global props
        resolveStyles(theme.global, { ...props, ...resolvedRootStyles }, theme),
      ),
      theme
    )
  }, [name, props, theme])
}

export default useRootStyles
