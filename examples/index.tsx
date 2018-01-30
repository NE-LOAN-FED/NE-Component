/**
 * @author kisnows
 * @create 2016/8/3.
 */
import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import '../src/_style/index.scss'
import './style/app.scss'

import App from './demo/App'
import Home from './demo/Home'
import Alert from './demo/Alert'
import Form from './demo/Form'
import Button from './demo/Button'
import Cell from './demo/Cell'
import Modal from './demo/Modal'
import Collapse from './demo/Collapse'
import Icon from './demo/Icon'
import NoticeBar from './demo/NoticeBar'
import Tab from './demo/Tab'
import Flow from './demo/Flow'
import ActionSheet from './demo/ActionSheet'

// if (module.hot) {
//   module.hot.accept()
// }

const root = document.getElementById('root')

ReactDom.render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='form' component={Form} />
      <Route path='alert' component={Alert} />
      <Route path='button' component={Button} />
      <Route path='cell' component={Cell} />
      <Route path='modal' component={Modal} />
      <Route path='collapse' component={Collapse} />
      <Route path='icon' component={Icon} />
      <Route path='noticebar' component={NoticeBar} />
      <Route path='tab' component={Tab} />
      <Route path='flow' component={Flow} />
      <Route path='actionsheet' component={ActionSheet} />
      <Route path='*' component={Home} />
    </Route>
  </Router>
), root)
