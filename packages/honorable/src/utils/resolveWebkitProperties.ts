import { StyleProps } from '../types'

function resolveWebkitProperties(styles: StyleProps): StyleProps {
  return Object.entries(styles).reduce((acc, [key, value]) => {
    acc[key.startsWith('webkit') || key.startsWith('moz') ? `-${key}` : key] = value

    return acc
  }, {})
}

export default resolveWebkitProperties
