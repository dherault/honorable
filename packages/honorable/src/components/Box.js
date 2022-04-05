import React from 'react'

import wrapComponentWithStyle from '../utils/wrapComponentWithStyle'

function Box(props) {
  return React.createElement('div', props)
}

export default wrapComponentWithStyle(Box)
