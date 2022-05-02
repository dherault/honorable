/* eslint-disable no-multi-spaces */
import { ComponentType, Ref, forwardRef, memo, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'
import merge from 'lodash.merge'

import {
  HonorableProps,
  MpProps,
  StyledHonorableProps,
  StylesProps,
} from './types'

import stylesProperties from './data/stylesProperties'
import mpProperties from './data/mpProperties'

import useTheme from './hooks/useTheme'

import filterObject from './utils/filterObject'
import isSelector from './utils/isSelector'
import convertMp from './utils/convertMp'
import convertXflex from './utils/convertXflex'
import resolveAll from './utils/resolveAll'
import resolveDefaultProps from './utils/resolveDefaultProps'

const allStylesProperties = [
  ...stylesProperties,
  ...stylesProperties.map(x => `${x}-mobile`),
  ...stylesProperties.map(x => `${x}-tablet`),
  ...stylesProperties.map(x => `${x}-desktop`),
]

const allMpProperties = [
  ...mpProperties,
  ...mpProperties.map(x => `${x}-mobile`),
  ...mpProperties.map(x => `${x}-tablet`),
  ...mpProperties.map(x => `${x}-desktop`),
]

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

    const [honorable, otherProps] = useMemo(() => {
      const {
        extend,
        xflex,
        'xflex-mobile': xflexMobile,
        'xflex-tablet': xflexTablet,
        'xflex-desktop': xflexDesktop,
        ...nextProps
      } = props
      const defaultProps = theme[name]?.defaultProps
      const stylesProps: StylesProps = {}
      const mpProps: MpProps = {}
      const otherProps = {} as P
      const resolvedProps = { ...nextProps, ...overridenProps }
      const resolvedDefaultProps = resolveDefaultProps(defaultProps, resolvedProps, theme)

      Object.entries(nextProps).forEach(([key, value]) => {
        if (allMpProperties.includes(key)) {
          mpProps[key] = value
        }
        else if ((allStylesProperties.includes(key) || isSelector(key)) && !propTypeKeys.includes(key)) {
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
            convertMp(mpProps, theme),                                                               // "mp" prop
            convertXflex({ xflex, xflexMobile, xflexTablet, xflexDesktop }, theme),                  // "xflex" prop
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
