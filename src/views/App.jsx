/**
 * @author kisnows
 * @create 2016/8/3.
 */
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Toast from '../components/Toast'
import {hideToast} from '../actions/Toast'
import redirect from '../utils/redirect'

class App extends React.Component {
  getChildContext = () => {
    const {push, pushCode} = this.props
    return {
      push,
      pushCode
    }
  }
  onToastClose = () => {
    this.props.hideToast()
  }

  render() {
    const {show, content} = this.props.state.Toast
    return (
      <div>
        <Toast show={show} onClose={this.onToastClose}>{content}</Toast>
        {this.props.children}
      </div>
    )
  }
}

App.childContextTypes = {
  push: PropTypes.func.isRequired,
  pushCode: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: (path) => {
      dispatch(push(path))
    },
    pushCode: (pathCode) => {
      dispatch(push(redirect[pathCode]))
    },
    hideToast: () => {
      dispatch(hideToast())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
