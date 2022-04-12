import PropTypes from 'prop-types'

const styleExclude = ['src']
const { style } = document.body

// The list of all style properties of the DOM
export const styleProperties = [...new Set(Object.getOwnPropertyNames(style).filter(p => typeof style[p] === 'string' && !styleExclude.includes(p)))]
// The propTypes corresponding to that list
export const stylePropTypes = Object.fromEntries(styleProperties.map(property => [property, PropTypes.oneOfType([PropTypes.string, PropTypes.number])]))
