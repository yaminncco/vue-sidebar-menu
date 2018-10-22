var path = require('path')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
    entry: './demo/main.js',
    output: {
      path: path.resolve(__dirname, './demo/dist'),
      publicPath: '/demo/dist',
      filename: 'build.js'
    },
});