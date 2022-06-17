import propToPseudoSelectors from '../data/propToPseudoSelectors'

function resolvePseudoSelectors(props: object): object {
  return Object.entries(props).reduce((accumulator, [key, value]) => {
    const pseudoSelectors = propToPseudoSelectors[key]

    if (pseudoSelectors && value && typeof value === 'object') {
      pseudoSelectors.forEach((pseudoSelector: string) => {
        accumulator[pseudoSelector] = Object.assign(accumulator[pseudoSelector] || {}, resolvePseudoSelectors(value))
      })

      return accumulator
    }

    accumulator[key] = value && typeof value === 'object' ? resolvePseudoSelectors(value) : value

    return accumulator
  }, {})
}

export default resolvePseudoSelectors
