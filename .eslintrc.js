/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const jestConf = require('./jest.config')

module.exports = {
  env: {
    es2020: true,
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: ['prettier', 'eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-console': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
  },
  overrides: [
    {
      files: jestConf.testMatch,
      env: {
        jest: true,
      },
      plugins: ['@typescript-eslint', 'jest'],
    },
  ],
}
