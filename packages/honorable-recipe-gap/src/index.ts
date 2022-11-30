const keys = ['gap', 'columnGap', 'rowGap']

function resolveGap(multiplier = 16) {
  return (props: any) => keys
    .map(key => typeof props[key] === 'number' ? { [key]: props[key] * multiplier } : {})
    .reduce((accumulator, currentValue) => ({ ...accumulator, ...currentValue }), {})
}

export default resolveGap
