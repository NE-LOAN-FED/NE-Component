/**
 * @author kisnows
 * @create 2016/8/3.
 */
import React from 'react'
import ReactDom from 'react-dom'
import { Router, hashHistory } from 'react-router'
import routes from './routes'

const root = document.getElementById('root')

ReactDom.render((
    <Router history={hashHistory} routes={routes}>
    </Router>
  ), root
)
