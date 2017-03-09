const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const cwd = process.cwd()

const config = {
  entry: {
    ne: [
      path.join(__dirname, '../src/index')
    ]
  },
  output: {
    path: path.join(cwd, './dist/'),
    filename: 'ne.js',
    library: 'ne',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.(css|scss|sass)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer({
                browsers: ['Android 4', '> 5%', 'iOS 7']
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].min.css',
      allChunks: false
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'classnames': 'classNames',
    'loadash': 'loadsh'
  }
}

module.exports = webpackMerge(baseConfig, config)
