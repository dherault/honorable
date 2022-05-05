// eslint-disable-next-line
const path = require('path')

// eslint-disable-next-line
var toJsonSchema = require('jsdoc-to-json-schema');

async function main() {
  // OPTION 2: generate a JSON schema and return it as an object
  toJsonSchema(path.join(__dirname, '../../packages/honorable/dist/components/Accordion/Accordion.js')).then(schema => {
    console.log('schema', schema)
  })
}

main().catch(console.error).then(console.log)
