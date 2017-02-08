const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const cwd = process.cwd()

const config = {
  entry: {
    ne: [
      path.join(__dirname, '../components/index')
    ]
  },
  output: {
    path: path.join(cwd, './dist/'),
    filename: 'ne.js',
    library: 'ne',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.(css|scss|sass)$/,
      loader: ExtractTextPlugin.extract('style-loader', ['css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap'])
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('./[name].min.css'),
    new webpack.optimize.UglifyJsPlugin()
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'classnames': 'classNames'
  },
  devtool: '#source-map'
}

module.exports = webpackMerge(baseConfig, config)
