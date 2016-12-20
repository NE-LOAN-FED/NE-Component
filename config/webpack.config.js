switch (process.env.NODE_ENV) {
  case 'demo':
    module.exports = require('./webpack.config.demo')
    break
  case 'production':
    module.exports = require('./webpack.config.build')
    break
  case 'test':
    module.exports = require('./webpack.config.test')
    break
  default:
    module.exports = require('./webpack.config.dev')
}

