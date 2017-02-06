/**
 * Created by kisnows on 2017/1/4.
 */
import React, {Component, PropTypes} from 'react'
import routes from './routes'
import {Router} from 'react-router'

export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const {history} = this.props
    return (
      <Router history={history} routes={routes}/>
    )
  }
}
