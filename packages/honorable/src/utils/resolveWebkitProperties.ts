import capitalize from './capitalize'
import reduceDeep from './reduceDeep'

function resolveWebkitProperties(styles: object): object {
  return reduceDeep(styles, (acc, key, value) => ({
    ...acc,
    [key.startsWith('webkit') || key.startsWith('moz') ? capitalize(key) : key]: value,
  }))
}

export default resolveWebkitProperties
