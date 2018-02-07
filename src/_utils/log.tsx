export interface logger {
  env: string;
  prefix: string;
}

export default class Logger implements logger {
  static DEBUG = 'DEBUG'
  static PROD = 'PROD'
  static DEV = 'DEV'
  env: string
  prefix: string

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
