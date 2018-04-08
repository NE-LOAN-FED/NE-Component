const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
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
    }]
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'classnames': 'classNames'
  }
}

module.exports = webpackMerge(baseConfig, config)
