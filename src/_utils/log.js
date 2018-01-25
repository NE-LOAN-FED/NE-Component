export default class Logger {
  static DEBUG = 'DEBUG'
  static PROD = 'PROD'
  static DEV = 'DEV'

  constructor (env, prefix) {
    this.env = env || Logger.DEBUG
    this.prefix = prefix
  }

  log (...argvs) {
    if (this.env === Logger.DEBUG) {
      console.log(this.prefix, ...argvs)
    }
  }

  info (...argvs) {
    if (this.env === Logger.DEBUG) {
      console.info(this.prefix, ...argvs)
    }
  }

  error (...argvs) {
    console.log(this.prefix, ...argvs)
  }
}
