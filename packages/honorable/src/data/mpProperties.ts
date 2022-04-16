import PropTypes from 'prop-types'

// The list of all available mp properties
export const mpProperties = [
  'm',
  'mx',
  'my',
  'mt',
  'mb',
  'mr',
  'ml',
  'p',
  'px',
  'py',
  'pt',
  'pb',
  'pr',
  'pl',
] as const
// The propTypes corresponding to that list
export const mpPropTypes = Object.fromEntries(mpProperties.map(prop => [prop, PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])])]))
