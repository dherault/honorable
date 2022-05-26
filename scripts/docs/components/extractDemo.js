// eslint-disable-next-line
const fs = require('fs')
// eslint-disable-next-line
const path = require('path')

function extractDemo() {
  const demoLocation = path.join(__dirname, '../../../storybook/src/stories')
  const files = fs.readdirSync(demoLocation).filter(x => x.endsWith('.demo.stories.tsx'))

  const componentToDemo = {}

  files.forEach(file => {
    const name = file.split('.')[0]

    componentToDemo[name] = { demos: [] }

    const location = path.join(demoLocation, file)
    const content = fs.readFileSync(location, 'utf8')

    let isDemo = false
    let isSource = false
    let demo = {
      source: '',
    }

    content.split('\n').forEach(line => {
      if (line.startsWith('// START-DEMO')) {
        isDemo = true
      }
      else if (isDemo) {
        if (isSource) {
          if (line.startsWith('// END-SOURCE')) {
            isSource = false
          }
          else {
            demo.source += `${line}\n`
          }
        }
        else if (line.startsWith('// @url ')) {
          demo.url = line.substring('// @url '.length)
        }
        else if (line.startsWith('// @name ')) {
          demo.name = line.substring('// @name '.length)
        }
        else if (line.startsWith('// START-SOURCE')) {
          isSource = true
        }
        else if (line.startsWith('// END-DEMO')) {
          componentToDemo[name].demos.push({ ...demo })
          demo = { source: '' }
          isDemo = false
          isSource = false
        }
      }
      else if (line.startsWith('// @parts ')) {
        componentToDemo[name].partsUrl = line.substring('// @parts '.length)
      }
    })
  })

  return componentToDemo
}

module.exports = extractDemo
