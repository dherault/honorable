import { useMemo } from 'react'
import merge from 'lodash.merge'

import { ComponentNames, HonorableTheme } from '../types.js'

import resolveAll from '../resolvers/resolveAll.js'
import resolveStyles from '../resolvers/resolveStyles.js'

function useRootStyles(name: ComponentNames, props: object, theme: HonorableTheme) {
  return useMemo(() => {
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
