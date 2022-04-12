import { SyntheticEvent } from 'react'

// Add value, checked, etc... to event.target and event.currentTarget
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
