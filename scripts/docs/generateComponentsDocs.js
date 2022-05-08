// eslint-disable-next-line
const path = require('path')

// eslint-disable-next-line
const { Project } = require('ts-morph')

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '../../packages/honorable/tsconfig.json'),
})

const sourceFile = project.getSourceFileOrThrow('Accordion.tsx')

// const type = sourceFile.getType('AccordionProps')

const props = sourceFile
.getTypeAlias('AccordionBaseProps')
.getChildAtIndex(4)
.getChildAtIndex(1)

for (let i = 0; i < props.getChildCount(); i++) {
  const prop = props.getChildAtIndex(i)

  console.log(prop.getName(), prop.getType().getText())

  const jsDoc = prop.getJsDocs()

  if (jsDoc[0]) {
    console.log(jsDoc[0].getDescription().trim())
  }

  console.log()
}
