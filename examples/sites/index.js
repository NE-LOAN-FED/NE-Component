import React from 'react'
import ReactDom from 'react-dom'
import routes from './routes.js'
console.log(routes)
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

const root = document.getElementById('root')

ReactDom.render((
  <Router history={hashHistory} routes={routes} >
  </Router>
), root)
