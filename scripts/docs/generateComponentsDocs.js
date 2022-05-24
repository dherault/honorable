// eslint-disable-next-line
const extractProps = require('./components/extractProps')

function generateComponentDocs() {
  const componentToProps = extractProps()

  console.log(componentToProps)
}

generateComponentDocs()
