const fs = require('fs')
const path = require('path')

const rimraf = require('rimraf') // eslint-disable-line

const {
  docsLocation,
  honorableLocation,
  htmlTagsDocsRelativeLocation,
  htmlTagsHonorableRelativeLocation,
} = require('./config.json')

function main() {
  const tagsDocsLocation = path.resolve(__dirname, docsLocation, htmlTagsDocsRelativeLocation)
  const readmeLocation = path.join(tagsDocsLocation, 'README.md')

  const readmeFile = fs.readFileSync(readmeLocation, 'utf8')

  rimraf(path.join(tagsDocsLocation, '**/*'), error => {
    if (error) {
      console.error(error)
      process.exit(1)
    }

    const tags = require(path.resolve(__dirname, honorableLocation, htmlTagsHonorableRelativeLocation)).default

    for (const tag of tags) {
      const componentName = capitalize(tag)

      fs.writeFileSync(
        path.join(tagsDocsLocation, `${componentName}.md`),
        createDocFile(componentName),
        'utf8'
      )
    }

    fs.writeFileSync(
      readmeLocation,
      readmeFile,
      'utf8'
    )
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
