/**
 * @author kisnows
 * @create 2016/8/3.
 */
import React from 'react'
import ReactDom from 'react-dom'
import {hashHistory} from 'react-router'
import Root from './Root'


const root = document.getElementById('root')

ReactDom.render((
  <Root history={hashHistory}/>
), root)

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NRoot = require('./Root').default
    ReactDom.render(
      <NRoot history={hashHistory}/>,
      root
    )
  })
}
