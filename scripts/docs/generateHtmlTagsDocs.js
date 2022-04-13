const fs = require('fs')
const path = require('path')

const rimraf = require('rimraf') // eslint-disable-line

const {
  docsLocation: _docsLocation,
  honorableLocation,
  htmlTagsDocsRelativeLocation,
  htmlTagsHonorableRelativeLocation,
  summaryRelativeLocation,
  summarySplitLinePrefix,
  summaryContentLinePrefix,
} = require('./config.json')

function main() {
  const docsLocation = path.join(__dirname, _docsLocation)
  const tagsDocsLocation = path.join(docsLocation, htmlTagsDocsRelativeLocation)
  const readmeLocation = path.join(tagsDocsLocation, 'README.md')

  const readmeFile = fs.readFileSync(readmeLocation, 'utf8')

  rimraf(path.join(tagsDocsLocation, '**/*'), error => {
    if (error) {
      console.error(error)
      process.exit(1)
    }

    const tags = require(path.join(__dirname, honorableLocation, htmlTagsHonorableRelativeLocation)).default
    const summaryEntries = []

    for (const tag of tags) {
      const componentName = capitalize(tag)

      summaryEntries.push(`  * [${componentName}](components/html-tags/${tag}.md)`)

      fs.writeFileSync(
        path.join(tagsDocsLocation, `${tag}.md`),
        createDocFile(componentName),
        'utf8'
      )
    }

    fs.writeFileSync(
      readmeLocation,
      readmeFile,
      'utf8'
    )

    const summaryFileLocation = path.join(docsLocation, summaryRelativeLocation)
    const summaryFile = fs.readFileSync(summaryFileLocation, 'utf8')
    const summaryArray = summaryFile.split('\n')

    let index = Infinity
    const indexesToRemove = []

    for (let i = 0; i < summaryArray.length; i++) {
      const line = summaryArray[i]

      if (line.startsWith(summarySplitLinePrefix)) {
        index = i
      }

      if (i > index && line.startsWith(summaryContentLinePrefix)) {
        indexesToRemove.push(i)
      }

      if (i > index && !line) index = Infinity
    }

    summaryArray.splice(indexesToRemove[0], indexesToRemove.length, ...summaryEntries.sort())

    fs.writeFileSync(
      summaryFileLocation,
      summaryArray.join('\n'),
      'utf8'
    )

    console.log('Generated', summaryEntries.length, 'entries.')
  })
}

function createDocFile(componentName) {
  return `# ${componentName}

## Usage

\`\`\`jsx
import { ${componentName} } from 'honorable'

function MyComponent() {
  return (
    <${componentName}>
      Hello world
    </${componentName}>
  )
}
\`\`\`

## Props

TODO
`
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

main()
