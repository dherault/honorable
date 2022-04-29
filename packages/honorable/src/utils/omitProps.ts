function omitProps(props: object, otherProps: object) {
  return Object.keys(props).reduce((acc, key) => {
    if (typeof otherProps[key] === 'undefined') {
      acc[key] = props[key]
    }

    return acc
  }, {})
}

export default omitProps
