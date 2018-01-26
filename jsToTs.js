const glob = require('glob')
const fs = require('fs')

let files = glob.sync('src/**/*.ts')
function changeExt(file, ext) {
  let reg = /.(\w)+$/
  let changeFile = file.replace(reg, ext)
  return changeFile
}

files.forEach(file => {
  let path = changeExt(file, '.tsx')
  fs.rename(file, path, err => console.error)
})
