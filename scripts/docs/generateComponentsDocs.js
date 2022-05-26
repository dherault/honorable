// eslint-disable-next-line
const extractProps = require('./components/extractProps')
// eslint-disable-next-line
const extractDemo = require('./components/extractDemo')

function generateComponentDocs() {
  const componentToProps = extractProps()
  const componentToDemo = extractDemo()

  generateComponentPage('Accordion', componentToProps.Accordion, componentToDemo.Accordion)
}

function generateComponentPage(name, props, demo) {

}

generateComponentDocs()
