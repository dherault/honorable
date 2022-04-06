import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import flexpad from 'flexpad'
import mpxx from 'mpxx'

import useTheme from '../hooks/useTheme'

import resolveColor from './resolveColor'

const { style } = document.body
const styleProperties = [...new Set(Object.getOwnPropertyNames(style).filter(p => typeof style[p] === 'string'))]

const colorProperties = [
  'backgroundColor',
  'background',
  'border',
  'borderBottom',
  'borderLeft',
  'borderRight',
  'borderTop',
  'borderColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderRightColor',
  'borderTopColor',
  'boxShadow',
  'caretColor',
  'color',
  'columnRule',
  'columnRuleColor',
  'filter',
  'opacity',
  'outlineColor',
  'outline',
  'textDecoration',
  'textDecorationColor',
  'textShadow',
]

const selectorPrefixes = [':', '&', '>', '~', '+', '.', ',', '#']

function isSelector(property) {
  const trimmedProperty = property.trim()

  return property.startsWith(' ') || selectorPrefixes.some(prefix => trimmedProperty.startsWith(prefix))
}

function extractDefaultStyle(theme) {
  return {
    fontFamily: theme.font,
  }
}

function wrapComponentWithStyle(ComponentOrTag, name = 'Honorable') {
  const HonorableStyle = styled(ComponentOrTag)(props => {
    const { theme, mp, flexpad: flexpadProp, ...nextProps } = props

    return Object.assign(
      extractDefaultStyle(theme),
      ...(mp ? mp.split(' ').filter(x => !!x).map(x => mpxx(x)) : [{}]),
      flexpadProp ? flexpad(flexpadProp) : {},
      Object.fromEntries(
        Object.entries(nextProps)
        .filter(([key]) => styleProperties.includes(key) || isSelector(key))
        .map(([key, value]) => colorProperties.includes(key) || isSelector(key) ? [key, resolveColor(value, theme)] : [key, value])
      ),
    )
  })

  function Honorable(props) {
    const theme = useTheme()

    const workingTheme = theme[name]

    if (!workingTheme) {
      return (
        <HonorableStyle
          theme={theme}
          {...props}
        />
      )
    }

    const { customProps, defaultProps = {} } = workingTheme
    const appliedCustomProps = {}

    if (customProps) {
      Object.keys(props).forEach(propKey => {
        if (customProps[propKey] && typeof customProps[propKey][props[propKey]] === 'object') {
          Object.assign(appliedCustomProps, customProps[propKey][props[propKey]])
        }
      })
    }

    return (
      <HonorableStyle
        theme={theme}
        {...defaultProps}
        {...appliedCustomProps}
        {...props}
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
