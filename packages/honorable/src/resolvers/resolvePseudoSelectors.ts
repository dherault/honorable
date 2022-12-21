import propToPseudoSelectors from '../data/propToPseudoSelectors.js'

function resolvePseudoSelectors(props: object): object {
  return Object.entries(props).reduce<Record<string, any>>((accumulator, [key, value]) => {
    const pseudoSelectors = propToPseudoSelectors[key as keyof typeof propToPseudoSelectors]

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
