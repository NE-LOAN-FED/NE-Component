/**
 * @author kisnows
 * @create 2016/8/3.
 */
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const config = require('./config')

const cwd = process.cwd()
const publicPath = `//${config.cdnHost}:${config.cdnPort}/${config.cdnPath}`
const nodeModulePath = path.join(cwd, 'node_modules')

const webpackConfig = {
  output: {
    path: path.join(cwd, 'dist'),
    filename: '[name]-[hash:8].js',
    chunkFilename: '[name]-[chunkhash:8].js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.sass', '.scss'],
    alias: {
      utils: path.resolve(cwd, 'src/utils'),
      font: path.resolve(cwd, 'src/assets/font'),
      images: path.resolve(cwd, 'src/assets/images')
    }
  },
  module: {
    loaders: [
      {
        test: /\.(css|scss|sass)$/,
        loader: process.env.NODE_ENV === 'development' ? 'style!css?sourceMap!postcss?sourceMap!sass?sourceMap' : ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
      },
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: cwd
      },
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10240&name=images/[path][name].[ext]?[hash:16]&context=' + path.resolve(cwd, 'src/assets/images')
      },
      {
        test: /\.(ttf|woff|woff|eot|svg)/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10240&name=font/[name].[ext]?[hash:16]&context=' + path.resolve(cwd, 'src/assets/font')
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[hash:8].js'),
    new ExtractTextPlugin('css/[name]-[hash:8].css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: false,
      filename: 'index.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: false,
      filename: 'test.html',
      inject: true,
      chunks: ['vendor','Alert']
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      // 'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
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

if (process.env.NODE_ENV === 'development') {
  webpackConfig.devtool = 'source-map'
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true',
    './src/index'
  ]
  webpackConfig.output.publicPath = '/'
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }))
} else if (process.env.NODE_ENV === 'production') {
  const entry = getEntry(path.join(cwd, 'src/components'))
  console.log(entry)
  webpackConfig.entry = entry

  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  )
}

function getEntry(root) {
  const entry = {}
  fs.readdirSync(root).forEach((v) => {
    if (fs.lstatSync(path.join('./src/components', v)).isDirectory()) {
      const entryPath = path.join(cwd,'./src/components', v, '/index.js')
      try {
        if (fs.lstatSync(entryPath).isFile()) {
          entry[v] = entryPath
        }
      } catch (err) {
      }
    }
  })
  return entry
}


module.exports = webpackConfig
