var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const path = require('path');
const vueLoaderConfig = require('./vue-loader.conf');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './doc/index.js'
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }).concat([
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'),resolve('doc'), resolve('/node_modules/ali-oss')],
        options: {
          plugins: ['transform-vue-jsx'],
        },
      }, {
        test: /\.(md)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: utils.assetsPath('md/[name].[ext]')
        }
      }
    ])
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './doc/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
