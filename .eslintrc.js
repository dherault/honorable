module.exports = {
  extends: 'dherault',
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    sourceType: 'module',
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-no-bind': 'off',
    'react/destructuring-assignment': 'off',
    'import/no-unresolved': 'off',
    'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
  },
}
