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
const autoprefixer = require('autoprefixer')

const config = {
  entry: {
    app: [
      path.join(__dirname, '../examples/index')
    ],
    vendors: ['babel-polyfill', 'react', 'react-dom', 'react-router']
  },
  output: {
    path: path.join(cwd, 'demo'),
    filename: '[name]-[chunkhash:8].js',
    chunkFilename: '[name]-[chunkhash:8].js',
    publicPath: '/'
  },
  mode: 'production',
  module: {
    rules: [
      // 不能使用 use 字段，暂时用 loader 代替
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../examples/index.html'),
      hash: false,
      filename: path.join(cwd, 'demo/index.html'),
      inject: true
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css'
      // 是否从所有追加的 chunk 中提取样式文件
      // allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}

module.exports = webpackMerge(baseConfig, config)
