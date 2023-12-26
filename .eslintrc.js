module.exports = {
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: '2022',
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  plugins: ['vue', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
