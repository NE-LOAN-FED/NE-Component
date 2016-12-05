/**
 * @author kisnows
 * @create 2016/8/4.
 */
let env
try {
  env = require('./env.js')
} catch (err) {
  env = {}
  console.error(err)
}

module.exports = {
  port: env.port || 3001,
  remoteApi: env.remoteApi || '10.240.96.129',
  cdnHost: 'i.epay.126.net',
  cdnPort: process.env.NODE_ENV === 'development' ? 3000 : 80,
  cdnPath: 'sparta/'
}
