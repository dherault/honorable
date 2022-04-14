function stringify(object, pad = '  ') {
  if (object instanceof Map) {
    let stringified = 'new Map([\n'

    object.forEach((value, key) => {
      stringified += `${pad}[\n`
      stringified += `${pad}  ${typeof key === 'function' ? key : stringify(key, `${pad}    `)},\n`
      stringified += `${pad}  ${stringify(value, `${pad}    `)},\n`
      stringified += `${pad}],\n`
    })

    return `${stringified}${pad.slice(2)}])`
  }
  if (typeof object === 'object') {
    let stringified = '{\n'

    Object.entries(object).forEach(([key, value]) => {
      const wrappedKey = key.match(/^[a-zA-Z][a-zA-Z0-9]*$/) ? key : `'${key.replaceAll("'", "\\'")}'`

      stringified += `${pad}${wrappedKey}: ${stringify(value, `${pad}  `)},\n`
    })

    return `${stringified}${pad.slice(2)}}`
  }
  if (typeof object === 'string') {
    return `'${object.replaceAll("'", "\\'")}'`
  }

  return JSON.stringify(object, null, 2)
}

export default stringify
