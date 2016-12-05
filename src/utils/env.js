/**
 * Created by kisnows on 2016/9/30.
 */
const ua = window.navigator.userAgent
const regs = {
  android: /Android/,
  ios: /(iPhone|iPad|iPod)/,
  weixin: /MicroMessenger/
}

const env = {}

Object.keys(regs).forEach((v) => {
  env[`is${v}`] = !!regs[v].test(ua)
})

export default env
