import React from 'react'
import classnames from 'classnames'
import Alert from '../../../src/Alert'


class AlertDemo extends React.Component {
  constructor() {
    super()
    this.state = {
      alertShow: false
    }
  }

  fireAlertShow = () => {
    this.setState({
      alertShow: true
    })
  }

  fireAlertHidden = () => {
    this.setState({
      alertShow: false
    })
  }

  render() {
    return (
      <section className="page-alert-demo">
        <p>page-alert-demo</p>
        <button onClick={this.fireAlertShow}>click it</button>
        <Alert show={this.state.alertShow}
          headerContent="测试"
          confirmContent="确认"
          onConfirm={this.fireAlertHidden}
          onCancel={this.fireAlertHidden}>
          这是内容
        </Alert>
      </section>
    )
  }
}

export default AlertDemo
