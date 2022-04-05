import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import flexpad from 'flexpad'
import mpxx from 'mpxx'

import useTheme from '../hooks/useTheme'

const { style } = document.body
const styleProperties = [...new Set(Object.getOwnPropertyNames(style).filter(p => typeof style[p] === 'string'))]

function wrapComponentWithStyle(Component, name) {
  function HonorableStyle(props) {
    const theme = useTheme()

    console.log('theme', theme)
    const { mp, flex, ...nextProps } = props
    const styleProps = Object.assign(
      mp ? mpxx(mp) : {},
      flex ? flexpad(flex) : {},
      Object.fromEntries(Object.entries(nextProps).filter(([key]) => styleProperties.includes(key))),
    )

    const NextComponent = Object.keys(styleProps).length ? styled(Component)(styleProps) : Component

    return <NextComponent {...nextProps} />
  }

  HonorableStyle.propTypes = {
    ...Component.propTypes,
    ...Object.fromEntries(styleProperties.map(property => [property, PropTypes.string])),
  }

  return HonorableStyle
}

export default wrapComponentWithStyle
