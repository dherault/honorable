// eslint-disable-next-line
const fs = require('fs')
// eslint-disable-next-line
const path = require('path')

// eslint-disable-next-line
const extractProps = require('./components/extractProps')
// eslint-disable-next-line
const extractDemo = require('./components/extractDemo')

function generateComponentDocs() {
  const componentToProps = extractProps()
  const componentToDemo = extractDemo()

  ;['Accordion'].forEach(component => {
    const docsDataLocation = path.join(__dirname, `../../site/src/docs/components/${component}.json`)

    fs.writeFileSync(
      docsDataLocation,
      JSON.stringify(
        {
          props: componentToProps[component],
          ...componentToDemo[component],
        },
        null,
        2
      ),
      'utf8'
    )
  })
}

generateComponentDocs()
