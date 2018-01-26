const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    app: [
      'webpack-dev-server/client',
      path.join(__dirname, '../examples/index')
    ]
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    inline: true,
    port: 4000,
    host: '0.0.0.0',
    lazy: false
  },
  module: {
    rules: [{
      test: /\.(css|scss|sass)$/,
      use: [
        'style-loader',
        'css-loader?sourceMap',
        'sass-loader?sourceMap'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../examples/index.html'),
      hash: false,
      filename: 'index.html',
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
