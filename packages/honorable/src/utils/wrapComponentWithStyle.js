const { style } = document.body
const properties = Object.getOwnPropertyNames(style)
.filter(p => typeof style[p] === 'string') // drop functions etc
.map(prop => // de-camelCase
  // prop = prop.replace(/[A-Z]/g, function($0) { return '-' + $0.toLowerCase() });

  // if (prop.startsWith("webkit-")) {
  //   prop = "-" + prop;
  // }

  prop
)

// Drop duplicates
const dedupedProperties = [...new Set(properties)]

console.log('dedupedProperties', dedupedProperties)
function wrapComponentWithStyle(Component) {
  function WrappedComponent(props) {
    return <Component {...props} />
  }
}

export default wrapComponentWithStyle
