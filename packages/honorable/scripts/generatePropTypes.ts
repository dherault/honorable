import path from 'path'

// eslint-disable-next-line import/no-extraneous-dependencies
import generate from 'typescript-proptypes-generator'

generate({
  tsConfig: './tsconfig.json',
  prettierConfig: '.prettierrc',
  inputPattern: path.join(__dirname, '../src/components/**/*.tsx'),
})
