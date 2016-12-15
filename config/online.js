/**
 * Created by kisnows on 2016/9/8.
 */
process.env.NODE_ENV = 'PROD'
const express = require('express')
const path = require('path')
const url = require('url')
const app = express()
const router = express.Router()
const cwd = process.cwd()
const mockRoutes = require('./data')
const request = require('request')
app.set('views', __dirname)

// middleware
app.use(express.static(path.resolve(__dirname, 'dist')))
app.use('/', router)
// route
mockRoutes(router)

router.get('/sparta/*', function (req, res, next) {
  var filepath = req.url
  filepath = filepath.split('?')[0].replace('/sparta', '')
  console.log('filepath', filepath)
  res.sendFile(path.join(__dirname, 'dist', filepath))
})

router.get('/ga.js', function (req, res) {
  request('https:// 8.163.com/ga.js').pipe(res)
})

router.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// 404
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  console.log(err.message)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

// port
app.listen(80, err => {
  if (err) {
    console.error(err)
  } else {
    console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', 80, 80)
  }
})
