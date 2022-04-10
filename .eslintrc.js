module.exports = {
  extends: 'dherault',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: 'module',
    babelOptions: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
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
  globals: {
    JSX: true,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-no-bind': 'off',
    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
  },
}
