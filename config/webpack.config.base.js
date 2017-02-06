const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

const cwd = process.cwd()
const nodeModulePath = path.join(cwd, 'node_modules')

const webpackConfig = {
  entry: {
    app: [
      path.join(__dirname, '../examples/index')
    ]
  },
  output: {
    path: path.join(cwd, './'),
    filename: '[name]-[hash:8].js',
    chunkFilename: '[name]-[chunkhash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.sass', '.scss']
  },
  module: {
    loaders: [{
      test: /\.(css|scss|sass)$/,
      loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap']
    }, {
      test: /\.(js|jsx)$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: cwd
    }, {
      test: /\.(jpeg|jpg|png|gif)$/,
      exclude: /node_modules/,
      loader: 'url-loader?limit=10240&name=images/[path][name].[ext]?[hash:16]&context=' + path.resolve(cwd, 'src/assets/images')
    }, {
      test: /\.(ttf|woff|woff|eot|svg)/,
      exclude: /node_modules/,
      loader: 'url-loader?limit=10240&name=font/[name].[ext]?[hash:16]&context=' + path.resolve(cwd, 'src/assets/font')
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../examples/index.html'),
      hash: false,
      filename: 'index.html',
      inject: true
    })
  ],
  postcss: function () {
    return [
      autoprefixer({
        browsers: ['Android 4', 'last 5 versions', '> 5%', 'iOS 7']
      })
    ]
  }
}

module.exports = webpackConfig
