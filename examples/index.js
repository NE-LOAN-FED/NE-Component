/**
 * @author kisnows
 * @create 2016/8/3.
 */
import React from 'react'
import ReactDom from 'react-dom'
import {Router, hashHistory, Route, IndexRedirect, IndexRoute} from 'react-router'
// import routes from './routes'

import App from './demo/App'
import HomeDemo from './demo/HomeDemo'
import FormDemo from './demo/FormDemo'

const root = document.getElementById('root')

ReactDom.render((
  <Router history={hashHistory}>
    <Route path={'/'} component={App}>
      <IndexRoute component={HomeDemo}/>
      <Route path={'form'} component={FormDemo}>
      </Route>
    </Route>
  </Router>
), root)
