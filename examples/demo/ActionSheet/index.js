import React from 'react'
import classnames from 'classnames'
import ActionSheet from '../../../src/ActionSheet'
import Button from '../../../src/Button'

class AlertDemo extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)

  }

  handleClose() {
    this.setState({
      show: false
    })
  }

  handleShow() {
    this.setState({
      show: true
    })
  }

  render() {
    const items = [
      <p>《使用授权书》</p>,
      <p>《服务协议》</p>,
      <p onClick={this.handleClose} className='cancel'>取消</p>
    ]
    return (
      <section className='page-actionsheet-demo'>
        <div className="page--header">
          <h1 className="page-title">ActionSheet</h1>
          <p className="page--desc">底部菜单</p>
        </div>
        <Button onClick={this.handleShow}>点击弹出ActionSheet</Button>
        <ActionSheet
          show={this.state.show}
          menus={items}
          onClose={this.handleClose}
          isClickMaskToClose
        />
      </section>
    )
  }
}

export default AlertDemo
