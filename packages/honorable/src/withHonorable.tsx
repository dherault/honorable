/* eslint-disable no-multi-spaces */
import { ComponentType, Ref, forwardRef, memo, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'
import merge from 'lodash.merge'

import {
  HonorableProps,
  StyledHonorableProps,
  StylesProps,
} from './types'

import styleProperties from './data/stylesProperties'
import mpProperties from './data/mpProperties'

import useTheme from './hooks/useTheme'

import filterObject from './utils/filterObject'
import isSelector from './utils/isSelector'
import resolveAll from './utils/resolveAll'
import resolveDefaultProps from './utils/resolveDefaultProps'

const allStyleProperties = [
  'xflex',
  ...mpProperties,
  ...styleProperties,
]

const suffixedAllStyleProperties = allStyleProperties.map(x => `${x}-`)

// TODO v1, make sure the honorable prop accepts anything and that its passed to the styled component
// React HOC to support style props
function withHonorable<P>(ComponentOrTag: string | ComponentType, name: string) {
  const isTag = typeof ComponentOrTag === 'string'
  const componentPropsTypes = isTag ? {} : ComponentOrTag.propTypes || {}
  const propTypeKeys = Object.keys(componentPropsTypes)

  const HonorableStyle = styled(
    ComponentOrTag as ComponentType<StyledHonorableProps & P>,
    {
      // TODO v1 check the necessity of every member (especially isPropValid)
      shouldForwardProp: prop => (
        isPropValid(prop)
        || (!isTag && (prop === 'honorableOverridenProps' || prop === 'honorableSetOverridenProps'))
        || propTypeKeys.includes(prop as string)
      ),
    }
  )(props => props.honorable)

  function Honorable(props: HonorableProps<P>, ref: Ref<any>) {
    const theme = useTheme()
    const [overridenProps, setOverridenProps] = useState({})

    // TODO v1 extract convertMp and xflex to resolveAll
    const [honorable, otherProps] = useMemo(() => {
      const { extend, ...nextProps } = props
      const defaultProps = theme[name]?.defaultProps
      const stylesProps: StylesProps = {}
      const otherProps = {} as P
      const resolvedProps = { ...nextProps, ...overridenProps }
      const resolvedDefaultProps = resolveDefaultProps(defaultProps, resolvedProps, theme)

      Object.entries(nextProps).forEach(([key, value]) => {
        if (
          (
            allStyleProperties.includes(key)
            || suffixedAllStyleProperties.some(x => key.startsWith(x))
            || isSelector(key)
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
            resolvedDefaultProps,                                                                    // Component defaultProps
            resolveDefaultProps(theme.global, { ...resolvedProps, ...resolvedDefaultProps }, theme), // Global props
            stylesProps,                                                                             // Actual style from props
            filterObject(extend),                                                                    // "extend" prop
          ),
          theme
        ),
        otherProps,
      ]
    }, [props, overridenProps, theme])

    return (
      <HonorableStyle
        ref={ref}
        theme={theme}
        honorableOverridenProps={overridenProps}
        honorableSetOverridenProps={setOverridenProps}
        honorable={honorable}
        {...otherProps}
      />
    )
  }

  const ForwardedHonorable = forwardRef(Honorable)

  ForwardedHonorable.displayName = `Honorable(${name})`
  ForwardedHonorable.propTypes = componentPropsTypes

  return memo(ForwardedHonorable)
}

export default withHonorable
