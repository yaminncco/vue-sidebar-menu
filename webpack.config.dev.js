var path = require('path')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.config.base')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = merge(baseConfig, {
    entry: './demo/main.js',
    output: {
      path: path.resolve(__dirname, './demo/dist'),
      publicPath: '/demo/dist',
      filename: 'build.js'
    },
    plugins: [
      new ExtractTextPlugin({
        disable: true
      })
    ]
});