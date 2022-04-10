import React, { ComponentType, FC, HTMLAttributes } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import styled from '@emotion/styled'
// @ts-ignore
import fp from 'flexpad'

import useTheme from '../hooks/useTheme'

import {
  AnyProps,
  ExtendProps,
  HonorableStyleProps,
  StyleProps,
  StylePropsValue,
  Theme,
} from '../types'

import resolveColor from './resolveColor'
import filterObject from './filterObject'
import isSelector from './isSelector'
import convertMp from './convertMp'
import { stylePropTypes, styleProperties } from './styleProperties'
import { mpPropTypes, mpProperties } from './mpProperties'

function isCustomProps(any: any) {
  return typeof any === 'object' && Object.values(any).every(value => value instanceof Map)
}

function getCustomProps(customTheme: any, props: AnyProps, theme: Theme) {
  const customStyle = {}
  const propsKeys = Object.keys(props)

  if (isCustomProps(customTheme)) {
    Object.keys(customTheme)
    .filter(propKey => propsKeys.includes(propKey))
    .forEach(propKey => {
      const propValue = props[propKey]
      const map = customTheme[propKey]

      if (map.has(propValue)) {
        const styleObject = map.get(propValue)

        if (typeof styleObject === 'object' && styleObject) Object.assign(customStyle, styleObject)
        else if (typeof styleObject === 'function') Object.assign(customStyle, styleObject({ theme, ...props }))
      }
    })
  }

  return customStyle
}

function wrapComponentWithStyle(ComponentOrTag: string | ComponentType, name = 'Honorable') {
  const HonorableStyle: FC<HonorableStyleProps> = styled(ComponentOrTag as ComponentType)(props => props.honorable)

  function Honorable(props: InferProps<typeof Honorable.propTypes> & HTMLAttributes<HTMLElement> & ExtendProps) {
    const theme = useTheme()
    const { customProps, defaultProps = {} } = theme[name] || {}
    const { xflex, extend = {}, ...nextProps } = props
    const stylePropsFromProps: StyleProps = {}
    const mpProps: StyleProps = {}
    const otherProps: AnyProps = {}

    Object.entries(nextProps).forEach(([key, value]) => {
      if (mpProperties.includes(key)) {
        mpProps[key] = value as StylePropsValue
      }
      else if (styleProperties.includes(key) || isSelector(key)) {
        stylePropsFromProps[key] = value as StylePropsValue
      }
      else {
        otherProps[key] = value
      }
    })

    return (
      <HonorableStyle
        honorable={resolveColor(
          null,
          {
            /* eslint-disable no-multi-spaces */
            ...getCustomProps(theme.global?.customProps, props, theme),  // Global customProps
            ...filterObject(defaultProps),                               // Component defaultProps
            ...getCustomProps(customProps, props, theme),                // Component customProps
            ...convertMp(mpProps),                                       // "mp" prop
            ...(xflex ? fp(xflex) : {}),                                 // "xflex" prop
            ...stylePropsFromProps,                                      // Actual style from props
            ...filterObject(extend),                                     // "extend" prop
            /* eslint-enable no-multi-spaces */
          },
          theme
        ) as StyleProps}
        {...otherProps}
      />
    )
  }

  Honorable.displayName = name

  Honorable.propTypes = {
    // TODO add standard props
    // https://github.com/facebook/react/blob/main/packages/react-dom/src/shared/possibleStandardNames.js
    // IN case HTMLAttributes<HTMLElement> is not enough
    ...(typeof ComponentOrTag === 'string' ? {} : ComponentOrTag.propTypes),
    ...stylePropTypes,
    ...mpPropTypes,
    xflex: PropTypes.string,
  }

  return Honorable
}

export default wrapComponentWithStyle
