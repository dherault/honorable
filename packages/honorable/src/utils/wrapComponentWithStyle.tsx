import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import styled from '@emotion/styled'
// @ts-ignore
import fp from 'flexpad'

import useTheme from '../hooks/useTheme'

import resolveColor from './resolveColor'
import filterObject from './filterObject'
import isSelector from './isSelector'
import convertMp from './convertMp'
import { styleProperties, stylePropTypes } from './styleProperties'

import {
  HonorableStyleProps,
  StyleProps,
  StylePropsValue,
  AnyProps,
  HonorableTheme,
} from '../types'


const mpProperties: string[] = []

;['m', 'p'].forEach(mp => {
  ['', 'x', 'y', 't', 'b', 'r', 'l'].forEach(x => {
    mpProperties.push(mp + x)
  })
})

function isCustomProps(any: any) {
  return typeof any === 'object' && Object.values(any).every(value => value instanceof Map)
}

function getCustomProps(customTheme: any, props: AnyProps, theme: HonorableTheme) {
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

function wrapComponentWithStyle(ComponentOrTag: FC<any>, name = 'Honorable') {
  const HonorableStyle: FC<HonorableStyleProps> = styled(ComponentOrTag)(props => props.honorable)

  function Honorable(props: InferProps<typeof Honorable.propTypes>) {
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
        )}
        {...otherProps}
      />
    )
  }

  Honorable.displayName = name

  Honorable.propTypes = {
    ...ComponentOrTag.propTypes,
    ...stylePropTypes,
  }

  return Honorable
}

export default wrapComponentWithStyle
