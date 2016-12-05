/**
 * Created by kisnows on 2016/10/25.
 * From http://stackoverflow.com/questions/32683440/handle-webpack-css-imports-when-testing-with-mocha
 * mocha /your/test.spec.js --compilers css:css-null-compiler.js
 */
function noop() {
  return null
}

require.extensions['.scss'] = noop
// you can add whatever you wanna handle
require.extensions['.png'] = noop
