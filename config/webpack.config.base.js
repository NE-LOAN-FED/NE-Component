const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const cwd = process.cwd()
const nodeModulePath = path.join(cwd, 'node_modules')

const webpackConfig = {
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
  postcss: function () {
    return [
      autoprefixer({
        browsers: ['Android 4', 'last 5 versions', '> 5%', 'iOS 7']
      })
    ]
  }
}

module.exports = webpackConfig
