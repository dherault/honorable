import React from 'react'

import wrapComponentWithStyle from './wrapComponentWithStyle'

function createComponent(tag, name) {
  function Honorable(props) {
    const { as: asComponent } = props

    return React.createElement(asComponent || tag || 'div', props)
  }

  return wrapComponentWithStyle(Honorable, name)
}

export default createComponent
