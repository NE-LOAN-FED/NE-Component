const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

baseConfig.entry.app.unshift('webpack-dev-server/client')

const config = {
  devServer: {
    devtool: 'eval',
    hot: true,
    inline: true,
    port: 3000,
    host: '0.0.0.0'
  },
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}

module.exports = webpackMerge(baseConfig, config)
