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
  devServer: {
    devtool: 'source-map',
    hot: true,
    inline: true,
    port: 3000,
    host: '0.0.0.0'
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
