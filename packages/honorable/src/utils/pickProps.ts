//  Pick only propTypes props
function pickProps<A extends object, B extends object>(props: object, propTypes: object): [A, B] {
  const picked = {}
  const omited = {}

  for (const key in props) {
    if (typeof propTypes[key] === 'undefined') {
      omited[key] = props[key]
    }
    else {
      picked[key] = props[key]
    }
  }

  return [picked, omited] as [A, B]
}

export default pickProps
