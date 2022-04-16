import { MouseEvent } from 'react'

// Add value, checked, etc... to event.target and event.currentTarget
function enhanceEventTarget(event: MouseEvent, object: object) {
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

export default enhanceEventTarget
