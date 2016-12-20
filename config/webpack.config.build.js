const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');


const config = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};

module.exports = webpackMerge(baseConfig,config);
