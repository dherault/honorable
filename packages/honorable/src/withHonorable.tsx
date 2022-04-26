/* eslint-disable no-multi-spaces */
import { ComponentType, Ref, forwardRef, useContext } from 'react'
import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'
import merge from 'lodash.merge'

import {
  HonorableProps,
  MpProps,
  StyleProps,
  StyledHonorableProps,
} from './types'

import styleProperties from './data/styleProperties'
import mpProperties from './data/mpProperties'

import useTheme from './hooks/useTheme'

import filterObject from './utils/filterObject'
import isSelector from './utils/isSelector'
import convertMp from './utils/convertMp'
import convertXflex from './utils/convertXflex'
import resolveAll from './utils/resolveAll'
import resolveAliases from './utils/resolveAliases'
import resolveCustomProps from './utils/resolveCustomProps'
import RegisterPropsContext from './contexts/RegisterPropsContext'

const allStyleProperties = [
  ...styleProperties,
  ...styleProperties.map(x => `${x}-mobile`),
  ...styleProperties.map(x => `${x}-tablet`),
  ...styleProperties.map(x => `${x}-desktop`),
]

const allMpProperties = [
  ...mpProperties,
  ...mpProperties.map(x => `${x}-mobile`),
  ...mpProperties.map(x => `${x}-tablet`),
  ...mpProperties.map(x => `${x}-desktop`),
]

// React HOC to support style props
function withHonorable<P>(ComponentOrTag: string | ComponentType, name: string) {
  const componentPropsTypes = typeof ComponentOrTag === 'string' ? {} : ComponentOrTag.propTypes || {}
  const propTypeKeys = Object.keys(componentPropsTypes)

  const HonorableStyle = styled(
    ComponentOrTag as ComponentType<StyledHonorableProps & P>,
    {
      shouldForwardProp: prop =>  isPropValid(prop) || propTypeKeys.includes(prop as string),
    }
  )(props => props.honorable)

  function Honorable(props: HonorableProps<P>, ref: Ref<any>) {
    const theme = useTheme()
    const [registeredProps] = useContext(RegisterPropsContext)

    const overridedProps = registeredProps[name] || {}
    const { defaultProps = {}, customProps } = theme[name] || {}
    const {
      extend = {},
      xflex,
      'xflex-mobile': xflexMobile,
      'xflex-tablet': xflexTablet,
      'xflex-desktop': xflexDesktop,
      ...nextProps
    } = props
    const styleProps: StyleProps = {}
    const mpProps: MpProps = {}
    const otherProps = {} as P
    const resolvedProps = resolveAliases({ ...nextProps, ...overridedProps }, theme)
    const resolvedDefaultProps = resolveAliases(filterObject(defaultProps) as StyleProps, theme)
    const resolvedWorkingProps = { ...resolvedDefaultProps, ...resolvedProps }
    const resolvedCustomProps = resolveAliases(resolveCustomProps(customProps, resolvedWorkingProps, theme), theme)

    Object.entries(resolvedProps).forEach(([key, value]) => {
      if (allMpProperties.includes(key)) {
        mpProps[key] = value
      }
      else if (allStyleProperties.includes(key) || isSelector(key)) {
        styleProps[key] = value
      }
      else {
        otherProps[key] = value
      }
    })

    return (
      <HonorableStyle
        ref={ref}
        theme={theme}
        honorable={(
          resolveAll(
            merge(
              {},
              resolvedDefaultProps,                                                    // Component defaultProps
              resolveCustomProps(                                                      // Global customProps
                theme.global?.customProps,
                { ...resolvedWorkingProps, ...resolvedCustomProps },
                theme
              ),
              resolvedCustomProps,                                                     // Component customProps
              convertMp(mpProps, theme),                                               // "mp" prop
              convertXflex({ xflex, xflexMobile, xflexTablet, xflexDesktop }, theme),  // "xflex" prop
              styleProps,                                                              // Actual style from props
              filterObject(extend),                                                    // "extend" prop
            ),
            theme
          )
        )}
        {...otherProps}
      />
    )
  }

  const ForwardedHonorable = forwardRef(Honorable)

  ForwardedHonorable.displayName = `Honorable(${name})`
  ForwardedHonorable.propTypes = componentPropsTypes

  return ForwardedHonorable
}

export default withHonorable
