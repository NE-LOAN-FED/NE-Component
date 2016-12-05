/**
 * @author kisnows
 * @create 2016/8/3.
 */
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const historyApiFallback = require('connect-history-api-fallback')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const request = require('request')

const webpackConfig = require('./webpack.config')
const config = require('./config')
const mockRoutes = require('./data')

const app = express()
const router = express.Router()
const port = config.port
const compiler = webpack(webpackConfig)

app.use('/', router)
app.use(historyApiFallback({
  verbose: false
}))

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  stats: {
    colors: true
  }
})

app.use(devMiddleware)
app.use(webpackHotMiddleware(compiler))

if (process.env.NODE_ENV === 'development') {
  mockRoutes(router)
  // nos token for app
  router.post('/common/generateNosToken', (req, res) => {
    request({
      form: req.body,
      method: req.method,
      url: 'http://10.165.124.82/common/generateNosToken',
      headers: req.headers
    }).pipe(res)
  })

  router.get('/ga.js', function (req, res) {
    request('https://8.163.com/ga.js').pipe(res)
  })
} else if (process.env.NODE_ENV === 'api') {
  router.use('/', (req, res) => {
    if (req.method.toUpperCase() === 'GET') {
      request({
        qs: req.body,
        method: req.method,
        url: 'http://' + process.env.REMOTE_API + req.url,
        headers: req.headers
      }).pipe(res)
    } else if (req.method.toUpperCase() === 'POST') {
      request({
        form: req.body,
        method: req.method,
        url: 'http://' + process.env.REMOTE_API + req.url,
        headers: req.headers
      }).pipe(res)
    }
  })
}

// 404
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error
app.use((err, req, res) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

app.listen(port, err => {
  if (err) {
    console.error(err)
  } else {
    console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})
