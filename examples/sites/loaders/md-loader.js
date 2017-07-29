
var markdown = require('markdown-it')
var hljs = require('highlight.js')
var cache = require('./cache')
var genId = require('./gen-id')
var loaderUtils = require('loader-utils')
var path = require('path')


module.exports = function (source) {
  // this.cacheable && this.cacheable();
  // this.value = content;
  // return "module.exports = " + JSON.stringify(content);

  this.cacheable()

  var parser
  // var params = loaderUtils.parseQuery(this.query)
  var params = (this.query === '' ? {} : loaderUtils.parseQuery(this.query));
  var opts = Object.assign({}, params)


  opts = Object.assign({
    preset: 'default',
    html: true,
    highlight: renderHighLight
  }, opts)

  var plugins = opts.use
  var preprocess = opts.preprocess

  delete opts.use
  delete opts.preprocess

  parser = markdown(opts.preset, opts)
  if (plugins) {
    plugins.forEach(function (plugin) {
      if (Array.isArray(plugin)) {
        parser.use.apply(parser, plugin)
      } else {
        parser.use(plugin)
      }
    })
  }

  if (preprocess) {
    source = preprocess.call(this, parser, source)
  }

  var filePath = this.resourcePath

  var content = addWrapper(parser.render(source))
  var result = renderReactTemplate(content)

  var fileName = path.basename(filePath, '.md')
  filePath = cache.save(fileName + '-' + genId(filePath), result)

  return 'module.exports = require(' +
    loaderUtils.stringifyRequest(this, 'babel-loader!' + filePath) +
    ');'

}
module.exports.seperable = true;


function renderHighLight(str, lang) {
  if (!(lang && hljs.getLanguage(lang))) {
    return ''
  }

  try {
    return hljs.highlight(lang, str, true).value
  } catch (err) { }
}

// function renderReactTemplate(html) {
//   return htmlToReactParser(html)
// }

function renderReactTemplate(source) {
  return `
    import React from 'react'
    
    export default class Markdown extends React.Component{
      constructor(props){
        super(props)
      }
      componentDidMount(){
        this.refs['container'].innerHTML=${source}
      }

      render() {
        return (
          <section ref='container' />
        )
      }
    }
  `
}

function addWrapper(snippet) {
  return '`<div>' + snippet + '</div>`'
}
