/**
 * @author kisnows
 * @create 2016/8/3.
 */
import React from 'react'
import ReactDom from 'react-dom'
import {Router, browserHistory, hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux'
import callAPIMiddleware from 'utils/callAPIMiddleware'
import routes from './routes'
import './scss/app.scss'

if (module.hot) {
  module.hot.accept()
}

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
})
const routerMiddle = routerMiddleware(hashHistory)
const logger = createLogger()
let store
if (process.env.NODE_ENV === 'development') {
  store = createStore(
    rootReducer,
    applyMiddleware(thunk, callAPIMiddleware, routerMiddle, logger)
  )
} else {
  store = createStore(
    rootReducer,
    applyMiddleware(thunk, callAPIMiddleware, routerMiddle)
  )
}

const history = syncHistoryWithStore(hashHistory, store)
const root = document.getElementById('root')

ReactDom.render((
    <Provider store={store}>
      <Router history={history} routes={routes}>
      </Router>
    </Provider>
  ), root
)
