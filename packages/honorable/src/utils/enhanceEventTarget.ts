// Add value, checked, etc... to event.target and event.currentTarget
function enhanceEventTarget<T>(event: T, object: object): T {
  return {
    ...event,
    target: {
      // @ts-expect-error
      ...event.target,
      ...object,
    },
    currentTarget: {
      // @ts-expect-error
      ...event.currentTarget,
      ...object,
    },
  }
}

export default enhanceEventTarget
