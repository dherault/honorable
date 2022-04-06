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
      if (!globalCustomProps[propKey]) return

      const propValue = props[propKey]

      if (Object.keys(globalCustomProps[propKey]).includes(propValue)) {
        Object.assign(customStyle, globalCustomProps[propKey][propValue])
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
      Object.keys(props).forEach(propKey => {
        if (customProps[propKey] && typeof customProps[propKey][props[propKey]] === 'object') {
          Object.assign(appliedCustomProps, customProps[propKey][props[propKey]])
        }
      })
    }

    const { mp, flexpad, ...nextProps } = props
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
