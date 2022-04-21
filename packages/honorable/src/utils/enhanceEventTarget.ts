import { MouseEvent } from 'react'

// Add value, checked, etc... to event.target and event.currentTarget
function enhanceEventTarget<T>(event: MouseEvent<T>, object: object): MouseEvent<T> {
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
