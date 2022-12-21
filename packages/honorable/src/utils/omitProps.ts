function omitProps(props: Record<string, any>, otherProps: Record<string, any>) {
  return Object.keys(props).reduce<Record<string, any>>((acc, key) => {
    if (typeof otherProps[key] === 'undefined') {
      acc[key] = props[key]
    }

    return acc
  }, {})
}

export default omitProps
