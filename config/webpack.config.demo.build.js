/**
 * Created by kisnows on 2017/2/16.
 */
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cwd = process.cwd()

const config = {
  entry: {
    app: [
      path.join(__dirname, '../examples/index')
    ]
  },
  module: {
    loaders: [{
      test: /\.(css|scss|sass)$/,
      loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../examples/index.html'),
      hash: false,
      filename: path.join(cwd, 'index.html'),
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}

module.exports = webpackMerge(baseConfig, config)
