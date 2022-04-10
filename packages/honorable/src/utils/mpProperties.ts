import PropTypes from 'prop-types'

function createMpProperties() {
  const mpProperties: string[] = []

  ;['m', 'p'].forEach(mp => {
    ['', 'x', 'y', 't', 'b', 'r', 'l'].forEach(x => {
      mpProperties.push(mp + x)
    })
  })

  return mpProperties
}

export const mpProperties = createMpProperties()
export const mpPropTypes = Object.fromEntries(mpProperties.map(prop => [prop, PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])])]))
