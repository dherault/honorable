import capitalize from '../utils/capitalize'
import reduceDeep from '../utils/reduceDeep'

function resolveWebkitProperties(styles: object): object {
  return reduceDeep(styles, (accumulator, key, value) => {
    accumulator[key.startsWith('webkit') || key.startsWith('moz') ? capitalize(key) : key] = value

    return accumulator
  })
}

export default resolveWebkitProperties
