const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cwd = process.cwd()
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    app: path.join(__dirname, '../examples/sites/index'),
    vendors: ['babel-polyfill', 'react', 'react-dom', 'react-router'],
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.join(cwd, 'sites'),
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash:8].js',
    sourceMapFilename: '[name].map',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(ttf|woff|woff|eot|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'font/[name].[ext]',
          context: path.resolve(cwd, 'examples/assets/font'),
          hash: '[hash:8]'
        }
      }
    }, {
      test: /\.(jpeg|jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'images/[path][name].[ext]',
          hash: '[hash:8]'
        }
      }
    }, {
      test: /\.(md)$/,
      use: [
        {
          loader: 'my-loader'
        }
        // {
        //   loader: "html-loader"
        // },
        // {
        //   loader: "markdown-loader",
        //   options: {
        //     /* your options here */
        //   }
        // }
      ]
    }, {
      test: /\.(css|scss|sass)$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          'css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: ['Android 4', 'last 5 versions', '> 5%', 'iOS 7']
                })
              ]
            }
          },
          'sass-loader?sourceMap'
        ]
      })
    }]
  },
  resolveLoader: {
    alias: {
      'my-loader': path.join(__dirname, '../examples/sites/loaders/md-loader')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../examples/sites/index.html'),
      hash: false,
      filename: path.join(cwd, 'sites/index.html'),
      inject: true
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css'
      // 是否从所有追加的 chunk 中提取样式文件
      // allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors'] // Specify the common bundle's name.
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}
