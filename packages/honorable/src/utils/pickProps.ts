//  Pick only propTypes props
function pickProps(props: object, propTypes: object): [object, object] {
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

  return [picked, omited]
}

export default pickProps
