// eslint-disable-next-line
const fs = require('fs')
// eslint-disable-next-line
const path = require('path')

// eslint-disable-next-line
const { Project } = require('ts-morph')

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '../../packages/honorable/tsconfig.json'),
})

async function main() {
  const components = fs.readdirSync(path.resolve(__dirname, '../../packages/honorable/src/components'))

  for (const component of components) {
    try {
      console.log('___', component, '\n')

      const sourceFile = project.getSourceFileOrThrow(`${component}.tsx`)

      // const type = sourceFile.getType('AccordionProps')

      const props = sourceFile
      .getTypeAlias(`${component}BaseProps`)
      .getChildAtIndex(4)
      .getChildAtIndex(1)

      for (let i = 0; i < props.getChildCount(); i++) {
        const prop = props.getChildAtIndex(i)

        const propType = prop.getType()

        let propTypeText = propType.getText()

        if (propTypeText.startsWith('import')) {
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxx')

          console.log('propType.getType().getText()', propTypeText.split(').')[1])
          let isArray = false
          let subPropName = propTypeText.split(').')[1]

          if (subPropName.endsWith('[]')) {
            subPropName = subPropName.slice(0, -2)
            isArray = true
          }

          console.log('subPropName', subPropName)

          const subProps = sourceFile
            .getTypeAlias(subPropName)
            .getChildAtIndex(4)

          console.log('subProps.getText()', subProps.getText(), isArray)

          console.log('xxxxxxxxxxxxxxxxxxxxxxxxx')

          propTypeText = subProps.getText()

          if (isArray) {
            propTypeText = `Array<${propTypeText}>`
          }
        }

        console.log(prop.getName(), propTypeText)

        const jsDoc = prop.getJsDocs()

        if (jsDoc[0]) {
          console.log(jsDoc[0].getDescription().trim())
        }

        console.log()
      }
    }
    catch (error) {
      console.warn('Error while generating docs for', component)
    }
  }
}

main()
