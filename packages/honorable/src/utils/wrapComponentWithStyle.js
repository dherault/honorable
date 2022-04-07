import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import fp from 'flexpad'
import mpxx from 'mpxx'

import useTheme from '../hooks/useTheme'

import resolveColor from './resolveColor'
import isSelector from './isSelector'

const styleExclude = ['src']
const { style } = document.body
const styleProperties = [...new Set(Object.getOwnPropertyNames(style).filter(p => typeof style[p] === 'string' && !styleExclude.includes(p)))]

function isMap(any) {
  return typeof any === 'object' && any.constructor === Map[Symbol.species]
}

function isCustomProps(any) {
  return typeof any === 'object' && Object.values(any).every(value => isMap(value))
}

function getCustomProps(customTheme, props, theme) {
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

function wrapComponentWithStyle(ComponentOrTag, name = 'Honorable') {
  const HonorableStyle = styled(ComponentOrTag)(props => props.honorable)

  function Honorable(props) {
    const theme = useTheme()
    const { customProps, defaultProps = {} } = theme[name] || {}
    const { mp, flexpad, extend = {}, ...nextProps } = props
    const stylePropsFromProps = {}
    const otherProps = {}

    Object.entries(nextProps).forEach(([key, value]) => {
      if (styleProperties.includes(key) || isSelector(key)) {
        stylePropsFromProps[key] = value
      }
      else {
        otherProps[key] = value
      }
    })

    return (
      <HonorableStyle
        honorable={resolveColor(
          null,
          Object.assign(
            /* eslint-disable no-multi-spaces */
            theme.global?.defaultProps || {},                                 // Global defaultProps
            getCustomProps(theme.global?.customProps, props, theme),          // Global customProps
            defaultProps,                                                     // Component defaultProps
            getCustomProps(customProps, props, theme),                        // Component customProps
            ...(mp ? mp.split(' ').filter(x => !!x).map(x => mpxx(x)) : []),  // "mp" prop
            flexpad ? fp(flexpad) : {},                                       // "flexpad" prop
            stylePropsFromProps,                                              // Actual style from props
            extend,                                                           // "extend" prop
            /* eslint-enable no-multi-spaces */
          ),
          theme
        )}
        {...otherProps}
      />
    )
  }

  Honorable.displayName = name

  Honorable.propTypes = {
    ...ComponentOrTag.propTypes,
    ...Object.fromEntries(styleProperties.map(property => [property, PropTypes.oneOfType([PropTypes.string, PropTypes.number])])),
  }

  return Honorable
}

export default wrapComponentWithStyle
