import { SyntheticEvent } from 'react'

function enhanceTarget(event: SyntheticEvent, object: object) {
  return {
    ...event,
    target: {
      ...event.target,
      ...object,
    },
    currentTarget: {
      ...event.currentTarget,
      ...object,
    },
  }
}

export default enhanceTarget
