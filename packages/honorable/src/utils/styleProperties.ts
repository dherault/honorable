import PropTypes from 'prop-types'

const styleExclude = ['src']
const { style } = document.body

export const styleProperties = [...new Set(Object.getOwnPropertyNames(style).filter(p => typeof style[p] === 'string' && !styleExclude.includes(p)))]
export const stylePropTypes = Object.fromEntries(styleProperties.map(property => [property, PropTypes.oneOfType([PropTypes.string, PropTypes.number])]))
