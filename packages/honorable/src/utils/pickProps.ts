type Props = Record<string, any>

//  Pick only propTypes props
function pickProps<A extends Props, B extends Props>(props: Props, propTypes: Props): [A, B] {
  const picked: Props = {}
  const omited: Props = {}

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
