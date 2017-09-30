import React from 'react'
import classNames from 'classnames'
// import Markdown from 'markdown-it'
// import hljs from 'highlight.js'
import 'highlight.js/styles/github-gist.css'
import ReactMarkdown from 'react-markdown'

export default class Content extends React.Component {
  constructor(props) {
    super(props)
    // this.md = new Markdown({
    //   html: true,
    //   highlight: renderHighLight
    // })
  }

  render() {
    const contentCls = classNames({
      'col-6': true,
      'is-scrollable': true,
      'content': true
    })
    return (
      <section className={contentCls} style={{height: '100vh', overflow: 'scroll'}}>

       {this.props.children}
      </section>
    )
  }
}
function renderHighLight(str, lang) {
  console.log(str)
  console.log(lang)
  if (!(lang && hljs.getLanguage(lang))) {
    return ''
  }

  try {
    return hljs.highlight(lang, str, true).value
  } catch (err) { }
}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}