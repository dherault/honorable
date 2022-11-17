function resolveMapper(key: string, map: Record<string, any> = {}) {
  return (props: any) => typeof props[key] === 'string' && typeof map[props[key]] !== 'undefined' && ({ [key]: map[props[key]] })
}

export default resolveMapper
