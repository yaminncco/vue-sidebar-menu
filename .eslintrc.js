module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  plugins: ['vue', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'prettier/prettier': ['error'],
  },
}
