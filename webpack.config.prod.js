var path = require('path')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
    entry: './src/index.js',
    output: {
        library: 'vue-sidebar-menu',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'vue-sidebar-menu.js'
    },
    externals: {
        "vue": "Vue"
    },
});