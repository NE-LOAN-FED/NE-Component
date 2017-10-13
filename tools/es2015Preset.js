const buildPreset = require('babel-preset-env').buildPreset

const BABEL_ENV = process.env.BABEL_ENV

module.exports = {
  presets: [
    [ buildPreset, {
      loose: true,
      modules: BABEL_ENV === 'es' ? false : 'commonjs'
    } ]
  ]
}
