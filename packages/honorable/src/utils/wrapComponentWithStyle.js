import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import fp from 'flexpad'
import mpxx from 'mpxx'

import useTheme from '../hooks/useTheme'

import resolveColor from './resolveColor'
import isSelector from './isSelector'

const { style } = document.body
const styleProperties = [...new Set(Object.getOwnPropertyNames(style).filter(p => typeof style[p] === 'string'))]

function extractDefaultStyle(theme, props) {
  const globalCustomProps = theme.global?.customProps
  const customStyle = {}

  if (globalCustomProps) {
    Object.keys(props).forEach(propKey => {
      if (globalCustomProps[propKey]?.[props[propKey]]) {
        Object.assign(customStyle, globalCustomProps[propKey][props[propKey]])
      }
    })
  }

  return {
    ...(theme.global?.defaultProps || {}),
    ...customStyle,
  }
}

function wrapComponentWithStyle(ComponentOrTag, name = 'Honorable') {
  const HonorableStyle = styled(ComponentOrTag)(props => props.honorable)

  function Honorable(props) {
    const theme = useTheme()
    const { customProps, defaultProps = {} } = theme[name] || {}
    const appliedCustomProps = {}

    if (customProps) {
      if (typeof customProps === 'object') {
        Object.keys(props).forEach(propKey => {
          if (typeof customProps[propKey] === 'object') {
            const propValue = customProps[propKey][props[propKey]] || {}

            if (typeof propValue === 'object') Object.assign(appliedCustomProps, propValue)
            else if (typeof propValue === 'function') Object.assign(appliedCustomProps, propValue(props))
          }
          else if (typeof customProps[propKey] === 'function') {
            Object.assign(appliedCustomProps, customProps[propKey](props))
          }
          else {
            console.warn(`Invalid customProp value for ${name}: ${propKey}. Expected object or function but got ${typeof customProps[propKey]}.`)
          }
        })
      }
      else if (typeof customProps === 'function') {
        Object.assign(appliedCustomProps, customProps(props))
      }
      else {
        console.warn(`Invalid customProp value for ${name}. Expected object or function but got ${typeof customProps}.`)
      }
    }

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
            extractDefaultStyle(theme, nextProps),
            defaultProps,
            appliedCustomProps,
            ...(mp ? mp.split(' ').filter(x => !!x).map(x => mpxx(x)) : []),
            flexpad ? fp(flexpad) : {},
            stylePropsFromProps,
            extend,
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
