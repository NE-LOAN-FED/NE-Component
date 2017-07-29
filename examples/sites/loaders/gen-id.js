var fileUid = 1
var fileRegistry = Object.create(null)

module.exports = function (file) {
  return fileRegistry[file] || (fileRegistry[file] = fileUid++)
}
