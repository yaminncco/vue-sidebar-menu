const path = require('path')

module.exports = {
  outDir: 'docs',
  alias: {
    '/@vue-sidebar-menu/': path.resolve(__dirname, 'src'),
    'vue': 'vue/dist/vue.esm-bundler.js'
  }
}
