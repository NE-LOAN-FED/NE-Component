/**
 * Created by kisnows on 2017/2/16.
 */
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
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
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: ['Android 4', 'last 5 versions', '> 5%', 'iOS 7']
                })
              ]
            }
          },
          'sass-loader'
        ]
      })
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
