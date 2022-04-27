import { StylesProps } from '../types'

import capitalize from './capitalize'

function resolveWebkitProperties(styles: StylesProps): StylesProps {
  return Object.entries(styles).reduce((acc, [key, value]) => {
    acc[key.startsWith('webkit') || key.startsWith('moz') ? capitalize(key) : key] = value

    return acc
  }, {})
}

export default resolveWebkitProperties
