// Add value, checked, etc... to event.target and event.currentTarget
function enhanceEventTarget<T>(event: T, object: object): T {
  return {
    ...event,
    target: {
      // @ts-ignore
      ...event.target,
      ...object,
    },
    currentTarget: {
      // @ts-ignore
      ...event.currentTarget,
      ...object,
    },
  }
}

export default enhanceEventTarget
