/**
 * @author kisnows
 * @create 2016/8/3.
 */
import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from './demo/App'
import HomeDemo from './demo/HomeDemo'
import FormDemo from './demo/FormDemo'
import AlertDemo from './demo/AlertDemo'

const root = document.getElementById('root')

ReactDom.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeDemo}/>
      <Route path="form" component={FormDemo} />
      <Route path="alert" component={AlertDemo} />
    </Route>
  </Router>
), root)
