import propToPseudoSelectors from '../data/propToPseudoSelectors'

function resolvePseudoSelectors(props: object): object {
  return Object.entries(props).reduce((accumulator, [key, value]) => {
    const pseudoSelectors = propToPseudoSelectors[key]

    if (pseudoSelectors && value && typeof value === 'object') {
      pseudoSelectors.forEach((pseudoSelector: string) => {
        accumulator[pseudoSelector] = resolvePseudoSelectors(value)
      })

      return accumulator
    }

    if (value && typeof value === 'object') {
      accumulator[key] = resolvePseudoSelectors(value)

      return accumulator
    }

    accumulator[key] = value

    return accumulator
  }, {})
}

export default resolvePseudoSelectors
